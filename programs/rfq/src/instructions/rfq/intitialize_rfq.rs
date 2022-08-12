use std::mem;

use crate::{
    constants::{COLLATERAL_SEED, PROTOCOL_SEED},
    errors::ProtocolError,
    interfaces::risk_engine::calculate_required_collateral_for_rfq,
    states::{CollateralInfo, FixedSize, Leg, OrderType, ProtocolState, Rfq, StoredRfqState},
};
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};

#[derive(Accounts)]
pub struct InitializeRfqAccounts<'info> {
    #[account(mut)]
    pub taker: Signer<'info>,

    #[account(seeds = [PROTOCOL_SEED.as_bytes()], bump = protocol.bump)]
    pub protocol: Account<'info, ProtocolState>,
    #[account(init, payer = taker, space = 8 + mem::size_of::<Rfq>())]
    pub rfq: Account<'info, Rfq>,
    #[account(seeds = [COLLATERAL_SEED.as_bytes(), taker.key().as_ref()], bump = collateral_info.bump)]
    pub collateral_info: Account<'info, CollateralInfo>,
    #[account(mut, seeds = [COLLATERAL_SEED.as_bytes(), taker.key().as_ref()],
                bump = collateral_info.token_account_bump)]
    pub collateral_token: Account<'info, TokenAccount>,

    pub quote_mint: Account<'info, Mint>,
    #[account(constraint = risk_engine.key() == protocol.risk_engine
        @ ProtocolError::NotARiskEngine)]
    pub risk_engine: AccountInfo<'info>,
    #[account(constraint = risk_engine_register.key() == protocol.risk_engine_register
        @ ProtocolError::NotARiskEngineRegister)]
    pub risk_engine_register: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

pub fn initialize_rfq_instruction(
    ctx: Context<InitializeRfqAccounts>,
    legs: Vec<Leg>,
    order_type: OrderType,
    active_window: u32,
    settling_window: u32,
) -> Result<()> {
    let InitializeRfqAccounts {
        taker,
        rfq,
        collateral_info,
        collateral_token,
        quote_mint,
        risk_engine,
        risk_engine_register,
        ..
    } = ctx.accounts;

    // TODO add legs instrument and data check

    let required_collateral =
        calculate_required_collateral_for_rfq(risk_engine, risk_engine_register, &legs)?;
    require!(
        required_collateral <= collateral_token.amount - collateral_info.locked_tokens_amount,
        ProtocolError::NotEnoughCollateral
    );

    collateral_info.locked_tokens_amount += required_collateral;
    rfq.set_inner(Rfq {
        taker: taker.key(),
        bump: *ctx.bumps.get("rfq").unwrap(),
        order_type,
        last_look_enabled: false,                   // TODO add logic later
        fixed_size: FixedSize::None { padding: 0 }, // TODO add logic later
        quote_mint: quote_mint.key(),
        access_manager: None, // TODO add logic later
        creation_timestamp: Clock::get()?.unix_timestamp,
        active_window,
        settling_window,
        state: StoredRfqState::Active,
        non_response_taker_collateral_locked: 0,
        total_taker_collateral_locked: required_collateral,
        total_responses: 0,
        cleared_responses: 0,
        confirmed_responses: 0,
        legs,
    });

    Ok(())
}
