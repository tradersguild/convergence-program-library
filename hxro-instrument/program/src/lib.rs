use anchor_lang::prelude::*;
use anchor_lang::Id;
use std::str::FromStr;

use dex_cpi;
use errors::HxroError;
use rfq::state::{ProtocolState, Response, Rfq};
use risk_cpi;
use state::AuthoritySideDuplicate;

mod errors;
mod helpers;
mod state;

declare_id!("fZ8jq8MYbf2a2Eu3rYFcFKmnxqvo8X9g5E8otAx48ZE");

const MAX_PRODUCTS_PER_TRADE: usize = 6;

const OPERATOR_CREATOR_FEE_PROPORTION: dex_cpi::typedefs::Fractional =
    dex_cpi::typedefs::Fractional { m: 0, exp: 0 };
const OPERATOR_COUNTERPARTY_FEE_PROPORTION: dex_cpi::typedefs::Fractional =
    dex_cpi::typedefs::Fractional { m: 0, exp: 0 };

#[derive(Debug, Clone)]
pub struct Dex;

impl Id for Dex {
    fn id() -> Pubkey {
        Pubkey::from_str("FUfpR31LmcP1VSbz5zDaM7nxnH55iBHkpwusgrnhaFjL").unwrap()
    }
}

#[program]
pub mod hxro_instrument {
    use super::*;

    pub fn validate_data(ctx: Context<ValidateData>) -> Result<()> {
        require!(ctx.accounts.rfq.legs.len() <= 6, HxroError::TooManyLegs);

        for leg in ctx.accounts.rfq.legs.clone() {
            helpers::validate_leg_data(&ctx, &leg.instrument_data)?;
        }

        helpers::validate_quote_data(&ctx, &ctx.accounts.rfq.quote_asset.instrument_data)?;

        Ok(())
    }

    pub fn create_print_trade(
        ctx: Context<CreatePrintTrade>,
        authority_side: AuthoritySideDuplicate,
    ) -> Result<()> {
        helpers::create_print_trade(&ctx, authority_side)
    }

    pub fn settle_print_trade(ctx: Context<SettlePrintTrade>) -> Result<()> {
        helpers::update_mark_price(&ctx)?;
        helpers::sign_print_trade(&ctx)?;
        Ok(())
    }

    pub fn clean_up(_ctx: Context<CleanUp>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ValidateData<'info> {
    #[account(signer)]
    pub protocol: Account<'info, ProtocolState>,
    pub rfq: Account<'info, Rfq>,

    /// CHECK:
    pub dex: AccountInfo<'info>,
    /// CHECK:
    pub fee_model_program: AccountInfo<'info>,
    /// CHECK:
    pub risk_engine_program: AccountInfo<'info>,
    /// CHECK:
    pub fee_model_configuration_acct: AccountInfo<'info>,
    /// CHECK:
    pub risk_model_configuration_acct: AccountInfo<'info>,
    /// CHECK:
    pub fee_output_register: AccountInfo<'info>,
    /// CHECK:
    pub risk_output_register: AccountInfo<'info>,
    /// CHECK:
    pub risk_and_fee_signer: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreatePrintTrade<'info> {
    pub protocol: Box<Account<'info, ProtocolState>>,
    pub rfq: Box<Account<'info, Rfq>>,
    pub response: Box<Account<'info, Response>>,

    /// CHECK:
    pub dex: Program<'info, Dex>,

    #[account(mut)]
    pub creator_owner: Signer<'info>,
    /// CHECK:
    pub operator_owner: AccountInfo<'info>,
    /// CHECK:
    pub creator: AccountInfo<'info>,
    /// CHECK:
    pub counterparty: AccountInfo<'info>,
    /// CHECK:
    pub operator: AccountInfo<'info>,

    /// CHECK:
    #[account(mut)]
    pub market_product_group: AccountInfo<'info>,

    /// CHECK:
    pub fee_model_program: AccountInfo<'info>,
    /// CHECK:
    pub fee_model_configuration_acct: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub fee_output_register: AccountInfo<'info>,
    /// CHECK:
    pub risk_engine_program: AccountInfo<'info>,
    /// CHECK:
    pub risk_model_configuration_acct: AccountInfo<'info>,
    /// CHECK:
    pub risk_output_register: AccountInfo<'info>,
    /// CHECK:
    pub risk_and_fee_signer: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub creator_trader_fee_state_acct: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub creator_trader_risk_state_acct: AccountInfo<'info>,

    /// CHECK:
    #[account(mut)]
    pub print_trade: AccountInfo<'info>,
    /// CHECK:
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SettlePrintTrade<'info> {
    pub protocol: Box<Account<'info, ProtocolState>>,
    pub rfq: Box<Account<'info, Rfq>>,
    pub response: Box<Account<'info, Response>>,

    /// CHECK:
    pub dex: Program<'info, Dex>,
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK:
    #[account(mut)]
    pub creator: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub counterparty: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub operator: AccountInfo<'info>,

    /// CHECK:
    #[account(mut)]
    pub market_product_group: AccountInfo<'info>,

    #[account(mut)]
    pub print_trade: Box<Account<'info, dex_cpi::state::PrintTrade>>,
    /// CHECK:
    pub system_program: Program<'info, System>,
    pub system_clock: Sysvar<'info, Clock>,

    /// CHECK:
    pub fee_model_program: AccountInfo<'info>,
    /// CHECK:
    pub fee_model_configuration_acct: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub fee_output_register: AccountInfo<'info>,
    /// CHECK:
    #[account(executable)]
    pub risk_engine_program: AccountInfo<'info>,
    /// CHECK:
    pub risk_model_configuration_acct: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub risk_output_register: AccountInfo<'info>,
    /// CHECK:
    pub risk_and_fee_signer: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub creator_trader_fee_state_acct: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub creator_trader_risk_state_acct: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub counterparty_trader_fee_state_acct: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub counterparty_trader_risk_state_acct: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub s_account: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub r_account: Box<Account<'info, risk_cpi::state::CorrelationMatrix>>,
    /// CHECK:
    #[account(mut)]
    pub mark_prices: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub btcusd_pyth_oracle: AccountInfo<'info>,
}

#[derive(Accounts)]
#[instruction(leg_index: u8)]
pub struct CleanUp<'info> {
    pub protocol: Box<Account<'info, ProtocolState>>,
    pub rfq: Box<Account<'info, Rfq>>,
    pub response: Box<Account<'info, Response>>,

    #[account(mut, close = receiver)]
    pub print_trade: Box<Account<'info, dex_cpi::state::PrintTrade>>,
    /// CHECK:
    #[account(mut)]
    pub receiver: AccountInfo<'info>,
}
