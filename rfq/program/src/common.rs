use std::iter;

use anchor_lang::prelude::*;
use anchor_spl::token::{transfer, Token, TokenAccount, Transfer};

use crate::{
    seeds::COLLATERAL_SEED,
    state::{AuthoritySide, CollateralInfo, Response, Rfq, StoredResponseState},
};

pub fn unlock_response_collateral(
    rfq: &mut Rfq,
    response: &mut Response,
    taker_collateral_info: &mut CollateralInfo,
    maker_collateral_info: &mut CollateralInfo,
) {
    let taker_collateral = response.taker_collateral_locked;
    if taker_collateral > 0 {
        taker_collateral_info.unlock_collateral(taker_collateral);
        response.taker_collateral_locked = 0;
        rfq.total_taker_collateral_locked -= taker_collateral;
    }

    let maker_collateral = response.maker_collateral_locked;
    if maker_collateral > 0 {
        maker_collateral_info.unlock_collateral(maker_collateral);
        response.maker_collateral_locked = 0;
    }
}

pub fn transfer_collateral_token<'info>(
    amount: u64,
    from: &Account<'info, TokenAccount>,
    to: &Account<'info, TokenAccount>,
    authority: &Account<'info, CollateralInfo>,
    token_program: &Program<'info, Token>,
) -> Result<()> {
    let transfer_accounts = Transfer {
        from: from.to_account_info(),
        to: to.to_account_info(),
        authority: authority.to_account_info(),
    };
    let bump_seed = [authority.bump];
    let transfer_seed = &[&[
        COLLATERAL_SEED.as_bytes(),
        authority.user.as_ref(),
        &bump_seed,
    ][..]];
    let transfer_ctx = CpiContext::new_with_signer(
        token_program.to_account_info(),
        transfer_accounts,
        transfer_seed,
    );
    transfer(transfer_ctx, amount)?;

    Ok(())
}

pub fn update_state_after_escrow_preparation(
    side: AuthoritySide,
    legs_prepared: u8,
    rfq: &mut Rfq,
    response: &mut Response,
) {
    let state_legs_prepared = response.get_prepared_legs_mut(side);
    *state_legs_prepared += legs_prepared;

    let state_legs_prepared = response.get_prepared_legs(side);
    if state_legs_prepared > response.escrow_leg_preparations_initialized_by.len() as u8 {
        let additional_entries =
            state_legs_prepared - response.escrow_leg_preparations_initialized_by.len() as u8;
        let items = iter::repeat(side).take(additional_entries as usize);
        response
            .escrow_leg_preparations_initialized_by
            .extend(items);
    }

    if response.is_prepared(AuthoritySide::Taker, rfq)
        && response.is_prepared(AuthoritySide::Maker, rfq)
    {
        response.state = StoredResponseState::ReadyForSettling;
    }
}
