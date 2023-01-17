use anchor_lang::prelude::*;
use rfq::state::{AuthoritySide, BaseAssetIndex, BaseAssetInfo, RiskCategory, Side};
use std::collections::HashMap;

use crate::{
    black_scholes::calculate_option_value,
    errors::Error,
    state::{
        Config, FutureCommonData, InstrumentType, OptionCommonData, RiskCategoryInfo, Scenario,
    },
    utils::strict_f64_to_u64,
    LegWithMetadata,
};

pub struct RiskCalculator<'a> {
    pub legs_with_meta: Vec<LegWithMetadata<'a>>,
    pub config: &'a Config,
    pub base_assets: Vec<BaseAssetInfo>,
    pub prices: HashMap<BaseAssetIndex, f64>,
    pub scenarios_selector:
        Box<dyn Fn(&Vec<LegWithMetadata<'a>>, RiskCategory) -> Vec<Scenario> + 'a>,
    pub current_timestamp: i64,
}

pub struct CalculationCase {
    pub leg_multiplier: f64,
    pub authority_side: AuthoritySide,
    pub quote_side: Side,
}

struct PortfolioStatistics {
    max_loss: f64,
    max_profit: f64,
}

struct BaseAssetStatistics {
    biggest_loss: f64,
    biggest_profit: f64,
    absolute_value_of_legs: f64,
}

impl<'a> RiskCalculator<'a> {
    pub fn calculate_risk_for_several_cases<const N: usize>(
        &self,
        cases: [CalculationCase; N],
    ) -> Result<[u64; N]> {
        let statistics = self.calculate_portfolio_statistics()?;

        let mut result = [0; N];
        for (i, case) in cases.into_iter().enumerate() {
            result[i] = self.calculate_risk_inner(&statistics, case)?;
        }

        Ok(result)
    }

    pub fn calculate_risk(&self, case: CalculationCase) -> Result<u64> {
        let statistics = self.calculate_portfolio_statistics()?;

        self.calculate_risk_inner(&statistics, case)
    }

    fn calculate_risk_inner(
        &self,
        statistics: &PortfolioStatistics,
        case: CalculationCase,
    ) -> Result<u64> {
        let mut portfolio_inverted = false;

        if let Side::Bid = case.quote_side {
            portfolio_inverted = !portfolio_inverted;
        }

        if let AuthoritySide::Taker = case.authority_side {
            portfolio_inverted = !portfolio_inverted;
        }

        let portfolio_risk = if portfolio_inverted {
            statistics.max_profit
        } else {
            statistics.max_loss
        };

        let total_risk = portfolio_risk * case.leg_multiplier;

        let total_risk_with_decimals =
            total_risk * (10_u64.pow(self.config.collateral_mint_decimals as u32)) as f64;
        strict_f64_to_u64(total_risk_with_decimals)
            .ok_or_else(|| error!(Error::MathInvalidConversion))
    }

    fn calculate_portfolio_statistics(&self) -> Result<PortfolioStatistics> {
        let mut all_profits = 0.0;
        let mut all_losses = 0.0;
        let mut total_leg_values = 0.0;

        for base_asset in self.base_assets.iter() {
            let BaseAssetStatistics {
                biggest_loss,
                biggest_profit,
                absolute_value_of_legs,
            } = self.calculate_statistics_for_base_asset(base_asset)?;

            all_profits += biggest_profit;
            all_losses -= biggest_loss;
            total_leg_values += absolute_value_of_legs;
        }

        let price_shift = self.apply_safety_price_shift_factor(total_leg_values);

        all_profits += price_shift;
        all_losses += price_shift;
        all_profits = self.apply_overall_risk_factor(all_profits);
        all_losses = self.apply_overall_risk_factor(all_losses);

        Ok(PortfolioStatistics {
            max_loss: all_losses,
            max_profit: all_profits,
        })
    }

    fn calculate_statistics_for_base_asset(
        &self,
        base_asset: &BaseAssetInfo,
    ) -> Result<BaseAssetStatistics> {
        let legs: Vec<_> = self
            .legs_with_meta
            .iter()
            .filter(|x| x.leg.base_asset_index == base_asset.index)
            .cloned()
            .collect();
        let price = self.prices.get(&base_asset.index).unwrap();
        let risk_category_info = self.config.get_risk_info(base_asset.risk_category);

        let leg_values = legs
            .iter()
            .map(|leg| self.calculate_current_value(leg, *price, risk_category_info))
            .collect::<Result<Vec<_>>>()?;
        let scenarios = (self.scenarios_selector)(&legs, base_asset.risk_category);

        let mut biggest_profit = f64::MIN;
        let mut biggest_loss = f64::MAX;
        for scenario in scenarios.iter() {
            let scenario_calculator = ScenarioRiskCalculator {
                legs_with_meta: &legs,
                unit_values: &leg_values,
                risk_category_info,
                scenario,
                price: *price,
                current_timestamp: self.current_timestamp,
            };

            let pnl = scenario_calculator.calculate()?;
            biggest_profit = biggest_profit.max(pnl);
            biggest_loss = biggest_loss.min(pnl);
        }

        let absolute_value_of_legs = leg_values.into_iter().map(|value| value.abs()).sum();

        require!(biggest_profit >= 0.0, Error::RiskOutOfBounds);
        require!(biggest_loss <= 0.0, Error::RiskOutOfBounds);

        Ok(BaseAssetStatistics {
            biggest_profit,
            biggest_loss,
            absolute_value_of_legs,
        })
    }

    fn apply_overall_risk_factor(&self, value: f64) -> f64 {
        value * (self.config.overall_safety_factor + 1.0)
    }

    fn apply_safety_price_shift_factor(&self, value: f64) -> f64 {
        value * self.config.safety_price_shift_factor
    }

    fn calculate_current_value(
        &self,
        leg_with_meta: &LegWithMetadata,
        price: f64,
        risk_category_info: RiskCategoryInfo,
    ) -> Result<f64> {
        calculate_asset_value(
            leg_with_meta,
            price,
            risk_category_info.annualized_30_day_volatility,
            risk_category_info.interest_rate,
            self.current_timestamp,
        )
    }
}

struct ScenarioRiskCalculator<'a> {
    legs_with_meta: &'a Vec<LegWithMetadata<'a>>,
    unit_values: &'a Vec<f64>,
    risk_category_info: RiskCategoryInfo,
    scenario: &'a Scenario,
    price: f64,
    current_timestamp: i64,
}

impl ScenarioRiskCalculator<'_> {
    fn calculate(self) -> Result<f64> {
        let mut total_pnl = 0.0;

        for (leg_with_meta, unit_value) in self.legs_with_meta.iter().zip(self.unit_values.iter()) {
            let pnl = self.calculate_leg_pnl(leg_with_meta, *unit_value)?;
            total_pnl += pnl;
        }

        Ok(total_pnl)
    }

    fn calculate_leg_pnl(&self, leg_with_meta: &LegWithMetadata, unit_value: f64) -> Result<f64> {
        let shocked_value = self.calculate_shocked_value(leg_with_meta)?;
        Ok(shocked_value - unit_value)
    }

    fn calculate_shocked_value(&self, leg_with_meta: &LegWithMetadata) -> Result<f64> {
        let shocked_price = self.price * (self.scenario.base_asset_price_change + 1.0);
        let mut shocked_volatility = self.risk_category_info.annualized_30_day_volatility;

        if self.scenario.volatility_change != 0.0 {
            shocked_volatility *= self.scenario.volatility_change + 1.0;
        }

        calculate_asset_value(
            leg_with_meta,
            shocked_price,
            shocked_volatility,
            self.risk_category_info.interest_rate,
            self.current_timestamp,
        )
    }
}

fn calculate_asset_value(
    leg_with_meta: &LegWithMetadata,
    price: f64,
    annualized_30_day_volatility: f64,
    interest_rate: f64,
    current_timestamp: i64,
) -> Result<f64> {
    let unit_value = calculate_asset_unit_value(
        leg_with_meta,
        price,
        annualized_30_day_volatility,
        interest_rate,
        current_timestamp,
    )?;

    Ok(unit_value * leg_with_meta.leg_amount_fraction)
}

fn calculate_asset_unit_value(
    leg_with_meta: &LegWithMetadata,
    price: f64,
    annualized_30_day_volatility: f64,
    interest_rate: f64,
    current_timestamp: i64,
) -> Result<f64> {
    match leg_with_meta.instrument_type {
        InstrumentType::Spot => Ok(price),
        InstrumentType::Option => {
            let option_data: OptionCommonData = AnchorDeserialize::try_from_slice(
                &leg_with_meta.leg.instrument_data[..OptionCommonData::SERIALIZED_SIZE],
            )?;

            let seconds_till_expiration =
                i64::max(0, option_data.expiration_timestamp - current_timestamp);

            Ok(calculate_option_value(
                option_data.option_type,
                price,
                option_data.get_underlying_amount_per_contract(),
                option_data.get_strike_price(),
                interest_rate,
                annualized_30_day_volatility,
                seconds_till_expiration,
            ))
        }
        InstrumentType::TermFuture | InstrumentType::PerpFuture => {
            let future_data: FutureCommonData = AnchorDeserialize::try_from_slice(
                &leg_with_meta.leg.instrument_data[..FutureCommonData::SERIALIZED_SIZE],
            )?;

            Ok(price * future_data.get_underlying_amount_per_contract())
        }
    }
}

#[cfg(test)]
mod tests {
    use float_cmp::assert_approx_eq;
    use rfq::state::{Leg, PriceOracle, ProtocolState};

    use crate::state::{OptionType, RiskCategoryInfo};
    use crate::utils::{convert_fixed_point_to_f64, get_leg_amount_f64};

    use super::*;

    const BTC_INDEX: BaseAssetIndex = BaseAssetIndex::new(0);
    const SOL_INDEX: BaseAssetIndex = BaseAssetIndex::new(1);

    fn get_config() -> Config {
        Config {
            collateral_for_variable_size_rfq_creation: 0,
            collateral_for_fixed_quote_amount_rfq_creation: 0,
            collateral_mint_decimals: 9,
            safety_price_shift_factor: 0.01,
            overall_safety_factor: 0.1,
            risk_categories_info: [RiskCategoryInfo {
                interest_rate: 0.05,
                annualized_30_day_volatility: 0.5,
                scenario_per_settlement_period: Default::default(),
            }; 5],
            instrument_types: [Default::default(); ProtocolState::MAX_INSTRUMENTS],
        }
    }

    #[test]
    fn one_spot_bitcoin_leg() {
        let config = get_config();

        let leg = Leg {
            instrument_amount: 2 * 10_u64.pow(6),
            instrument_decimals: 6,
            side: Side::Bid,
            base_asset_index: BTC_INDEX,
            instrument_program: Default::default(),
            instrument_data: Default::default(),
        };
        let legs_with_meta = vec![LegWithMetadata {
            leg: &leg,
            instrument_type: InstrumentType::Spot,
            leg_amount_fraction: get_leg_amount_f64(&leg),
        }];

        let base_assets = vec![BaseAssetInfo {
            index: BTC_INDEX,
            bump: Default::default(),
            risk_category: RiskCategory::VeryLow,
            price_oracle: PriceOracle::Switchboard {
                address: Default::default(),
            },
            ticker: Default::default(),
        }];

        let prices = HashMap::from([(BTC_INDEX, 20_000.0)]);

        fn scenarios_selector(
            _legs: &Vec<LegWithMetadata>,
            _risk_category: RiskCategory,
        ) -> Vec<Scenario> {
            vec![Scenario::new(0.1, 0.0), Scenario::new(-0.1, 0.0)]
        }

        let risk_calculator = RiskCalculator {
            legs_with_meta,
            config: &config,
            base_assets,
            prices,
            scenarios_selector: Box::new(scenarios_selector),
            current_timestamp: 0,
        };

        let required_collateral = risk_calculator
            .calculate_risk(CalculationCase {
                leg_multiplier: 3.0,
                authority_side: AuthoritySide::Taker,
                quote_side: Side::Ask,
            })
            .unwrap();
        assert_eq!(
            required_collateral,
            14520 * 10_u64.pow(config.collateral_mint_decimals as u32)
        );
    }

    #[test]
    fn basis_bitcoin_rfq() {
        let config = get_config();

        let legs = vec![
            Leg {
                instrument_amount: 2 * 10_u64.pow(6),
                instrument_decimals: 6,
                side: Side::Bid,
                base_asset_index: BTC_INDEX,
                instrument_program: Default::default(),
                instrument_data: Default::default(),
            },
            Leg {
                instrument_amount: 2 * 10_u64.pow(6),
                instrument_decimals: 6,
                side: Side::Ask,
                base_asset_index: BTC_INDEX,
                instrument_program: Default::default(),
                instrument_data: Default::default(),
            },
        ];
        let legs_with_meta = vec![
            LegWithMetadata {
                leg: &legs[0],
                instrument_type: InstrumentType::Spot,
                leg_amount_fraction: get_leg_amount_f64(&legs[0]),
            },
            LegWithMetadata {
                leg: &legs[1],
                instrument_type: InstrumentType::Spot,
                leg_amount_fraction: get_leg_amount_f64(&legs[1]),
            },
        ];

        let base_assets = vec![BaseAssetInfo {
            index: BTC_INDEX,
            bump: Default::default(),
            risk_category: RiskCategory::VeryLow,
            price_oracle: PriceOracle::Switchboard {
                address: Default::default(),
            },
            ticker: Default::default(),
        }];

        let prices = HashMap::from([(BTC_INDEX, 20_000.0)]);

        fn scenarios_selector(
            _legs: &Vec<LegWithMetadata>,
            _risk_category: RiskCategory,
        ) -> Vec<Scenario> {
            vec![Scenario::new(0.1, 0.0), Scenario::new(-0.1, 0.0)]
        }

        let risk_calculator = RiskCalculator {
            legs_with_meta,
            config: &config,
            base_assets,
            prices,
            scenarios_selector: Box::new(scenarios_selector),
            current_timestamp: 0,
        };

        let required_collateral = risk_calculator
            .calculate_risk(CalculationCase {
                leg_multiplier: 3.0,
                authority_side: AuthoritySide::Taker,
                quote_side: Side::Ask,
            })
            .unwrap();
        assert_eq!(
            required_collateral,
            2640 * 10_u64.pow(config.collateral_mint_decimals as u32)
        );
    }

    #[test]
    fn buy_bitcoin_sell_solana_rfq() {
        let config = get_config();

        let legs = vec![
            Leg {
                instrument_amount: 1 * 10_u64.pow(6),
                instrument_decimals: 6,
                side: Side::Bid,
                base_asset_index: BTC_INDEX,
                instrument_program: Default::default(),
                instrument_data: Default::default(),
            },
            Leg {
                instrument_amount: 100 * 10_u64.pow(9),
                instrument_decimals: 9,
                side: Side::Ask,
                base_asset_index: SOL_INDEX,
                instrument_program: Default::default(),
                instrument_data: Default::default(),
            },
        ];
        let legs_with_meta = vec![
            LegWithMetadata {
                leg: &legs[0],
                instrument_type: InstrumentType::Spot,
                leg_amount_fraction: get_leg_amount_f64(&legs[0]),
            },
            LegWithMetadata {
                leg: &legs[1],
                instrument_type: InstrumentType::Spot,
                leg_amount_fraction: get_leg_amount_f64(&legs[1]),
            },
        ];

        let base_assets = vec![
            BaseAssetInfo {
                index: BTC_INDEX,
                bump: Default::default(),
                risk_category: RiskCategory::VeryLow,
                price_oracle: PriceOracle::Switchboard {
                    address: Default::default(),
                },
                ticker: Default::default(),
            },
            BaseAssetInfo {
                index: SOL_INDEX,
                bump: Default::default(),
                risk_category: RiskCategory::Medium,
                price_oracle: PriceOracle::Switchboard {
                    address: Default::default(),
                },
                ticker: Default::default(),
            },
        ];

        let prices = HashMap::from([(BTC_INDEX, 20_000.0), (SOL_INDEX, 30.0)]);

        fn scenarios_selector(
            _legs: &Vec<LegWithMetadata>,
            risk_category: RiskCategory,
        ) -> Vec<Scenario> {
            if risk_category == RiskCategory::VeryLow {
                vec![Scenario::new(0.1, 0.0), Scenario::new(-0.1, 0.0)]
            } else {
                vec![Scenario::new(0.2, 0.0), Scenario::new(-0.2, 0.0)]
            }
        }

        let risk_calculator = RiskCalculator {
            legs_with_meta,
            config: &config,
            base_assets,
            prices,
            scenarios_selector: Box::new(scenarios_selector),
            current_timestamp: 0,
        };

        let required_collateral = risk_calculator
            .calculate_risk(CalculationCase {
                leg_multiplier: 3.0,
                authority_side: AuthoritySide::Taker,
                quote_side: Side::Ask,
            })
            .unwrap();
        assert_eq!(
            required_collateral,
            9339 * 10_u64.pow(config.collateral_mint_decimals as u32)
        );
    }

    #[test]
    fn one_option_call() {
        let config = get_config();

        let option_data = OptionCommonData {
            option_type: OptionType::Call,
            underlying_amount_per_contract: 1 * 10_u64.pow(8),
            strike_price: 22000 * 10_u64.pow(9),
            expiration_timestamp: 90 * 24 * 60 * 60,
        };

        let leg = Leg {
            instrument_amount: 1 * 10_u64.pow(6),
            instrument_decimals: 6,
            side: Side::Bid,
            base_asset_index: BTC_INDEX,
            instrument_program: Default::default(),
            instrument_data: option_data.try_to_vec().unwrap(),
        };
        let legs_with_meta = vec![LegWithMetadata {
            leg: &leg,
            instrument_type: InstrumentType::Option,
            leg_amount_fraction: get_leg_amount_f64(&leg),
        }];

        let base_assets = vec![BaseAssetInfo {
            index: BTC_INDEX,
            bump: Default::default(),
            risk_category: RiskCategory::VeryLow,
            price_oracle: PriceOracle::Switchboard {
                address: Default::default(),
            },
            ticker: Default::default(),
        }];

        let prices = HashMap::from([(BTC_INDEX, 20_000.0)]);

        fn scenarios_selector(
            _legs: &Vec<LegWithMetadata>,
            _risk_category: RiskCategory,
        ) -> Vec<Scenario> {
            vec![
                Scenario::new(0.1, 0.2),
                Scenario::new(0.1, -0.2),
                Scenario::new(-0.1, 0.2),
                Scenario::new(-0.1, -0.2),
            ]
        }

        let risk_calculator = RiskCalculator {
            legs_with_meta,
            config: &config,
            base_assets,
            prices,
            scenarios_selector: Box::new(scenarios_selector),
            current_timestamp: 0,
        };

        let required_collateral = risk_calculator
            .calculate_risk(CalculationCase {
                leg_multiplier: 3.0,
                authority_side: AuthoritySide::Taker,
                quote_side: Side::Bid,
            })
            .unwrap();
        assert_approx_eq!(
            f64,
            convert_fixed_point_to_f64(required_collateral, config.collateral_mint_decimals),
            471.9,
            epsilon = 0.1
        );
    }
}
