use crate::{
    errors::ProtocolError,
    seeds::{COLLATERAL_SEED, COLLATERAL_TOKEN_SEED, PROTOCOL_SEED},
    state::{CollateralInfo, ProtocolState},
};
use anchor_lang::prelude::*;
use anchor_spl::token::{transfer, Token, TokenAccount, Transfer};
use spl_token::ID as TOKEN_PROGRAM_ID;
use spl_token_2022::ID as TOKEN_2022_PROGRAM_ID;

#[derive(Accounts)]
pub struct FundCollateralAccounts<'info> {
    pub user: Signer<'info>,
    #[account(mut, constraint = user_tokens.mint == protocol.collateral_mint
                @ ProtocolError::NotACollateralTokenAccount)]
    pub user_tokens: Account<'info, TokenAccount>,

    #[account(seeds = [PROTOCOL_SEED.as_bytes()], bump = protocol.bump)]
    pub protocol: Box<Account<'info, ProtocolState>>,
    #[account(seeds = [COLLATERAL_SEED.as_bytes(), user.key().as_ref()], bump = collateral_info.bump)]
    pub collateral_info: Account<'info, CollateralInfo>,
    #[account(mut, seeds = [COLLATERAL_TOKEN_SEED.as_bytes(), user.key().as_ref()],
                bump = collateral_info.token_account_bump)]
    pub collateral_token: Account<'info, TokenAccount>,

    #[account(constraint = 
        token_program.key == &spl_token::ID || 
        token_program.key == &spl_token_2022::ID
    )]
    pub token_program: Program<'info, Token>,
}

fn validate(ctx: &Context<FundCollateralAccounts>, amount: u64) -> Result<()> {
    let FundCollateralAccounts { user_tokens, .. } = &ctx.accounts;

    require!(user_tokens.amount >= amount, ProtocolError::NotEnoughTokens);

    Ok(())
}

pub fn fund_collateral_instruction(
    ctx: Context<FundCollateralAccounts>,
    amount: u64,
) -> Result<()> {
    validate(&ctx, amount)?;

    let FundCollateralAccounts {
        user_tokens,
        collateral_token,
        user,
        token_program,
        ..
    } = ctx.accounts;

    let transfer_ix = if ctx.accounts.collateral_info.is_token_2022 {
        spl_token_2022::instruction::transfer_checked(
            token_program.key,
            &user_tokens.key(),
            &collateral_token.mint,
            &collateral_token.key(),
            &user.key(),
            &[],
            amount,
            collateral_token.decimals,
        )?
    } else {
        let transfer_accounts = Transfer {
            from: user_tokens.to_account_info(),
            to: collateral_token.to_account_info(),
            authority: user.to_account_info(),
        };
        let transfer_ctx = CpiContext::new(token_program.to_account_info(), transfer_accounts);
        transfer(transfer_ctx, amount)?;
    };

    Ok(())
}
