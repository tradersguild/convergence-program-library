use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");


#[program]
pub mod rfq {
    use super::*;
    /// Initializes protocol.
    ///
    /// fee_denominator Fee denominator
    /// fee_numerator Fee numerator
    /// ctx Accounts context
    pub fn initialize(
        ctx: Context<Initialize>,
        fee_denominator: u64,
        fee_numerator: u64,
    ) -> ProgramResult {
        let protocol = &mut ctx.accounts.protocol;
        protocol.access_manager_count = 0;
        protocol.rfq_count = 0;
        protocol.authority = ctx.accounts.authority.key();
        protocol.fee_denominator = fee_denominator;
        protocol.fee_numerator = fee_numerator;
        Ok(())
    }
    
    /// Ideally, RFQs are: customized, anonymous, viewable to all participants
    /// why RFQ? eliminate leg risk, efficient price discovery, competitive quotes under illiquidity, customizable strategies
    /// why now? dire need for on-chain liquidity provision for structured products and large DAO transactions
    /// Q: do we need one numeraire for undercollateralized RFQ?
    /// Q: how do we prevent spam transactions since solana is so cheap? make taker pay some flat fee just to initialize rfq?
    /// naive version: send request, put up collateral on both sides
    /// version #2: send request, put up collateral on side you want to trade in
    /// version #3: anonymize to hide direction, have designated MMs who get special privileges 
    pub fn initialize_rfq(
        ctx: Context<InitializeRfq>,
        title: String,
        taker_order_type: u8, // 1=buy, 2=sell, 3=two-way
        instrument: u8, // Token, Future, Option, may not be needed
        expiry: i64, // when RFQ timer ~expires
        ratio: u8, // 1, inert for now, will be relevant for multi leg
        n_of_legs: u8, // inert for now
        amount: u64,
    ) -> ProgramResult {
        let rfq_state = &mut ctx.accounts.rfq_state;
         //*ctx.accounts.action.to_account_info().key;
        rfq_state.instrument = instrument;
        rfq_state.expiry = expiry;
        rfq_state.expired = false;
        rfq_state.ratio = ratio;
        rfq_state.n_of_legs = n_of_legs;
        rfq_state.order_count = 0;
        rfq_state.taker_order_type = taker_order_type;
        rfq_state.amount = amount;

        rfq_state.asset_mint = *ctx.accounts.asset_mint.to_account_info().key;
        rfq_state.quote_mint = *ctx.accounts.quote_mint.to_account_info().key;

        //let order_book_state = &mut ctx.accounts.order_book_state;
        //order_book_state.bids = vec![];
        //order_book_state.asks = vec![];
        Ok(())
    }

    /// return one or two-way quote from request, single response per wallet, allow multiple responses
    /// what if two cpties tie for best price? give it to who priced earlier? what if both priced in same block, split the trade?
    /// how do we mitigate 'fat finger' error? make some protections for makers?
    /// margining system? 10% collateral upfront and slash if trade gets cancelled.
    pub fn respond_rfq(
        ctx: Context<RespondRfq>,
        title: String,
        order_type: u8, // 1=buy/bid, 2=sell/ask, 3=two-way
        price: u64,
        amount: u64,
    ) -> ProgramResult {

        let rfq_state = &mut ctx.accounts.rfq_state;
        let mut best_bid = rfq_state.best_bid;
        let mut best_ask = rfq_state.best_bid;
        let mut best_bid_address = rfq_state.best_bid_address;
        let mut best_ask_address = rfq_state.best_bid_address;
        let authority = ctx.accounts.authority.key();
        let mut order_count = rfq_state.order_count;

        if order_count == 0 {
            best_ask = 18446744073709551615;
            best_bid = 0;
        }

        if order_type == 1 {
            if price > best_bid {
                rfq_state.best_bid = price;
                rfq_state.best_bid_address = authority;

                anchor_spl::token::transfer(
                    CpiContext::new(
                        ctx.accounts.token_program.to_account_info(),
                        anchor_spl::token::Transfer {
                            from: ctx.accounts.quote_token.to_account_info(),
                            to: ctx.accounts.escrow_quote_token.to_account_info(),
                            authority: ctx.accounts.authority.to_account_info(),
                        },
                    ),
                    amount,
                )?;
            }
        } else if order_type == 2 {
            if price < best_ask {
                rfq_state.best_ask = price;
                rfq_state.best_ask_address = authority;

                anchor_spl::token::transfer(
                    CpiContext::new(
                        ctx.accounts.token_program.to_account_info(),
                        anchor_spl::token::Transfer {
                            from: ctx.accounts.asset_token.to_account_info(),
                            to: ctx.accounts.escrow_asset_token.to_account_info(),
                            authority: ctx.accounts.authority.to_account_info(),
                        },
                    ),
                    amount,
                )?;
            }
        } else {
            return Err(ErrorCode::InvalidQuoteType.into());
        }
        // TODO: check if RFQ hasn't timed out
        
        rfq_state.order_count+=1;
        Ok(())
    }

    /// TODO: make sure to test respond and confirm RFQ as different wallets!
    /// taker confirms by picking a side (bid or ask) or by cancelling the transaction
    /// if within 20-30s, taker does nothing, transaction auto-cancels
    pub fn confirm(
        ctx: Context<Confirm>,
        title: String,
        order_type: u8,
    ) -> ProgramResult {
        // check if valid best_bid or best_offer exists
        let rfq_state = &mut ctx.accounts.rfq_state;
        let mut best_bid = rfq_state.best_bid;
        let mut best_ask = rfq_state.best_bid;
        let mut best_bid_address = rfq_state.best_bid_address;
        let mut best_ask_address = rfq_state.best_bid_address;
        let authority = ctx.accounts.authority.key();
        let mut order_count = rfq_state.order_count;
        
        let amount = rfq_state.amount;
        // price = quote/asset, e.g. $150 per share of AAPL, 

        if order_type == 2 {
            let asset_amount = amount / best_bid;

            anchor_spl::token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.asset_token.to_account_info(),
                        to: ctx.accounts.escrow_asset_token.to_account_info(),
                        authority: ctx.accounts.authority.to_account_info(),
                    },
                ),
                asset_amount,
            )?;
        } else if order_type == 1 {
            anchor_spl::token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.quote_token.to_account_info(),
                        to: ctx.accounts.escrow_quote_token.to_account_info(),
                        authority: ctx.accounts.authority.to_account_info(),
                    },
                ),
                amount,
            )?;
        }

        rfq_state.confirmed = true;
        Ok(())
    }

    pub fn counter(
        ctx: Context<RespondRfq>
    ) -> ProgramResult {
        Ok(())
    }

    /// settle RFQ, swap tokens between winning MM and taker, and return all collateral
    pub fn settle(
        ctx: Context<RespondRfq>
    ) -> ProgramResult {
        Ok(())
    }

}

/// TBD: global state variables
#[derive(Accounts)]
pub struct Initialize<'info> {
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        seeds = [b"convergence_rfq"],
        space = 8 + 32 + 8 + 8 + 8 + 8,
        bump
    )]
    pub protocol: Account<'info, GlobalState>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(
    title: String,
)]
pub struct InitializeRfq<'info> {
    pub authority: Signer<'info>,

    pub asset_mint: Account<'info, Mint>,
    pub quote_mint: Account<'info, Mint>,
    /*
    #[account(
        init_if_needed,
        payer = authority,
        seeds = [b"order_book_state"],
        space = 1024,
        bump
    )]
    pub order_book_state: Account<'info, OrderBookState>,
    */
    #[account(
        init,
        payer = authority,
        seeds = [b"rfq_state", authority.to_account_info().key.as_ref(), name_seed(&title)],
        space = 1024,
        bump
    )]
    pub rfq_state: Account<'info, RfqState>,
    
    // programs
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(
    title: String,
)]
pub struct RespondRfq<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        init_if_needed,
        payer = authority,
        seeds = [b"rfq_state", authority.to_account_info().key.as_ref(), name_seed(&title)],
        space = 1024,
        bump
    )]
    pub rfq_state: Box<Account<'info, RfqState>>,
    
    #[account(mut)]
    pub asset_token: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub quote_token: Box<Account<'info, TokenAccount>>,
    
    #[account(
        init_if_needed,
        payer = authority,
        seeds = [b"escrow_asset", authority.to_account_info().key.as_ref(), name_seed(&title)],
        bump,
        token::mint = asset_mint,
        token::authority = escrow_asset_token,
    )]
    pub escrow_asset_token: Box<Account<'info, TokenAccount>>, // this PDA will be an authority for escrow with token pledged by wallet
    #[account(
        init_if_needed,
        payer = authority,
        seeds = [b"escrow_quote", authority.to_account_info().key.as_ref(), name_seed(&title)],
        bump,
        token::mint = quote_mint,
        token::authority = escrow_quote_token,
    )]
    pub escrow_quote_token: Box<Account<'info, TokenAccount>>, // this PDA will be an authority for escrow with token pledged by wallet
    pub asset_mint: Box<Account<'info, Mint>>,
    pub quote_mint: Box<Account<'info, Mint>>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}


#[derive(Accounts)]
#[instruction(
    title: String,
)]
pub struct Confirm<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        init_if_needed,
        payer = authority,
        seeds = [b"rfq_state", authority.to_account_info().key.as_ref(), name_seed(&title)],
        space = 1024,
        bump
    )]
    pub rfq_state: Box<Account<'info, RfqState>>,
    
    #[account(mut)]
    pub asset_token: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub quote_token: Box<Account<'info, TokenAccount>>,
    
    #[account(
        init_if_needed,
        payer = authority,
        seeds = [b"escrow_asset", authority.to_account_info().key.as_ref(), name_seed(&title)],
        bump,
        token::mint = asset_mint,
        token::authority = escrow_asset_token,
    )]
    pub escrow_asset_token: Box<Account<'info, TokenAccount>>, // this PDA will be an authority for escrow with token pledged by wallet
    #[account(
        init_if_needed,
        payer = authority,
        seeds = [b"escrow_quote", authority.to_account_info().key.as_ref(), name_seed(&title)],
        bump,
        token::mint = quote_mint,
        token::authority = escrow_quote_token,
    )]
    pub escrow_quote_token: Box<Account<'info, TokenAccount>>, // this PDA will be an authority for escrow with token pledged by wallet
    pub asset_mint: Box<Account<'info, Mint>>,
    pub quote_mint: Box<Account<'info, Mint>>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

/// holds state of a given RFQ
#[account]
pub struct RfqState { 
    pub action: bool,
    pub instrument: u8,
    pub expiry: i64, // 30secs?
    pub expired: bool,
    pub ratio: u8,
    pub n_of_legs: u8,
    pub asset_mint: Pubkey,
    pub quote_mint: Pubkey,
    pub best_bid: u64,
    pub best_ask: u64,
    pub best_bid_address: Pubkey,
    pub best_ask_address: Pubkey,
    pub order_count: u16,
    pub taker_order_type: u8,
    pub amount: u64,
    pub confirmed: bool,
}

/// global state for the entire RFQ system
#[account]
pub struct GlobalState {
    pub rfq_count: u64, // ? for our indexooors
    pub access_manager_count: u64,
    pub authority: Pubkey,
    pub fee_denominator: u64,
    pub fee_numerator: u64,
}

pub fn name_seed(name: &str) -> &[u8] {
    let b = name.as_bytes();
    if b.len() > 32 { &b[0..32] } else { b }
}

#[error]
pub enum ErrorCode {
    #[msg("Invalid quote type")]
    InvalidQuoteType,
}
