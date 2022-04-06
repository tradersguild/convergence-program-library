//! Request for quote (RFQ) protocol.
//!
//! Provides an abstraction and implements the RFQ mechanism.

use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use solana_program::sysvar::clock::Clock;

declare_id!("H2tGQVUikR4hBgHL5JRX9UY5LQy8C4qjQdX6Xw4LricZ");

// NOTE: Do not use hyphens in seed
/// Asset escrow PDA seed
pub const ASSET_ESCROW_SEED: &str = "asset_escrow";
/// Order PDA seed
pub const ORDER_SEED: &str = "order";
/// Protocol PDA seed
pub const PROTOCOL_SEED: &str = "protocol";
/// Quote PDA seed
pub const QUOTE_ESCROW_SEED: &str = "quote_escrow";
/// RFQ PDA seed
pub const RFQ_SEED: &str = "rfq";

/// Request for quote module.
#[program]
pub mod rfq {
    use super::*;

    /// Initializes protocol.
    ///
    /// ctx
    /// fee_denominator Fee denominator
    /// fee_numerator Fee numerator
    pub fn initialize(
        ctx: Context<Initialize>,
        fee_denominator: u64,
        fee_numerator: u64,
    ) -> Result<()> {
        instructions::initialize(ctx, fee_denominator, fee_numerator)
    }

    /// Taker requests quote (RFQ).
    ///
    /// expiry
    /// legs
    /// expiry
    /// order_amount
    /// request_order
    pub fn request(
        ctx: Context<Request>,
        expiry: i64,
        legs: Vec<Leg>,
        order_amount: u64,
        request_order: Order,
    ) -> Result<()> {
        instructions::request(ctx, expiry, legs, order_amount, request_order)
    }

    /// Maker responds with one-way or two-way quotes.
    ///
    /// ctx
    /// bid
    /// ask
    #[access_control(respond_access_control(&ctx, bid, ask))]
    pub fn respond(ctx: Context<Respond>, bid: Option<u64>, ask: Option<u64>) -> Result<()> {
        instructions::respond(ctx, bid, ask)
    }

    /// Taker confirms order.
    ///
    /// ctx
    /// confirm_order
    #[access_control(confirm_access_control(&ctx, confirm_order))]
    pub fn confirm(ctx: Context<Confirm>, confirm_order: Order) -> Result<()> {
        instructions::confirm(ctx, confirm_order)
    }

    /// Last look.
    ///
    /// ctx
    pub fn last_look(ctx: Context<LastLook>) -> Result<()> {
        instructions::last_look(ctx)
    }

    /// Return collateral of losting makers.
    ///
    /// ctx
    #[access_control(return_collateral_access_control(&ctx))]
    pub fn return_collateral(ctx: Context<ReturnCollateral>) -> Result<()> {
        instructions::return_collateral(ctx)
    }

    /// Settles winning maker and taker fund transfers.
    ///
    /// ctx
    #[access_control(settle_access_control(&ctx))]
    pub fn settle(ctx: Context<Settle>) -> Result<()> {
        instructions::settle(ctx)
    }
}

// State

/// Holds state of a single RFQ.
#[account]
pub struct RfqState {
    /// If approved by authority
    pub approved: bool,
    /// Asset escrow bump
    pub asset_escrow_bump: u8,
    /// Asset mint
    pub asset_mint: Pubkey,
    /// Authority
    pub authority: Pubkey,
    /// Best ask amount
    pub best_ask_amount: Option<u64>,
    /// Best bid amount
    pub best_bid_amount: Option<u64>,
    /// Best ask amount
    pub best_ask_address: Option<Pubkey>,
    /// Best bid amount
    pub best_bid_address: Option<Pubkey>,
    /// PDA bump
    pub bump: u8,
    /// Confirm order
    pub confirm_order: Order,
    /// Confirmed
    pub confirmed: bool,
    /// Expiry time
    pub expiry: i64,
    /// Incremental integer id
    pub id: u64,
    /// Legs
    pub legs: Vec<Leg>,
    /// Order amount
    pub order_amount: u64,
    /// Quote escrow bump
    pub quote_escrow_bump: u8,
    /// Quote mint
    pub quote_mint: Pubkey,
    /// Response count
    pub response_count: u64,
    /// Request order
    pub request_order: Order,
    /// Taker address
    pub taker_address: Pubkey,
    /// Creation time
    pub unix_timestamp: i64,
}

impl RfqState {
    pub const LEN: usize = 8 + (32 * 6) + (Leg::LEN * 10 + 1) + (8 * 7) + (1 * 12);
}

/// Global state for the entire RFQ system
#[account]
pub struct ProtocolState {
    pub access_manager_count: u64,
    pub authority: Pubkey,
    pub bump: u8,
    pub fee_denominator: u64,
    pub fee_numerator: u64,
    pub rfq_count: u64,
    pub treasury_wallet: Pubkey,
}

impl ProtocolState {
    pub const LEN: usize = 8 + (32 * 2) + (8 * 4) + (1 * 1);
}

/// Market maker order state
#[account]
pub struct OrderState {
    pub ask: Option<u64>,
    pub authority: Pubkey,
    pub bid: Option<u64>,
    pub bump: u8,
    pub collateral_returned: bool,
    pub id: u64,
    /// Creation time
    pub unix_timestamp: i64,
}

impl OrderState {
    pub const LEN: usize = 8 + (32 * 1) + (8 * 4) + (1 * 1) + (1 * 1) + (1 * 2);
}

// Contexts

/// Intializes protocol.
#[derive(Accounts)]
pub struct Initialize<'info> {
    /// Protocol authority
    #[account(mut)]
    pub authority: Signer<'info>,
    /// Protocol state
    #[account(
        init,
        payer = authority,
        seeds = [PROTOCOL_SEED.as_bytes()],
        space = ProtocolState::LEN,
        bump
    )]
    pub protocol: Account<'info, ProtocolState>,
    /// Solana system program
    pub system_program: Program<'info, System>,
}

/// Requests quote (RFQ).
#[derive(Accounts)]
pub struct Request<'info> {
    /// Asset escrow account
    #[account(
        init,
        payer = authority,
        token::mint = asset_mint,
        token::authority = rfq,
        seeds = [
            ASSET_ESCROW_SEED.as_bytes(),
            (protocol.rfq_count + 1).to_string().as_bytes()
        ],
        bump
    )]
    pub asset_escrow: Account<'info, TokenAccount>,
    /// Asset mint
    pub asset_mint: Box<Account<'info, Mint>>,
    /// Request authority
    #[account(mut)]
    pub authority: Signer<'info>,
    /// Protocol state
    #[account(
        mut,
        seeds = [PROTOCOL_SEED.as_bytes()],
        bump = protocol.bump
    )]
    pub protocol: Account<'info, ProtocolState>,
    /// Quote escrow account
    #[account(
        init,
        payer = authority,
        token::mint = quote_mint,
        token::authority = rfq,
        seeds = [
            QUOTE_ESCROW_SEED.as_bytes(),
            (protocol.rfq_count + 1).to_string().as_bytes()
        ],
        bump
    )]
    pub quote_escrow: Account<'info, TokenAccount>,
    /// Quote mint
    pub quote_mint: Box<Account<'info, Mint>>,
    /// TODO: Decide what to do about this
    pub rent: Sysvar<'info, Rent>,
    /// RFQ state
    #[account(
        init,
        payer = authority,
        seeds = [
            RFQ_SEED.as_bytes(),
            (protocol.rfq_count + 1).to_string().as_bytes()
        ],
        space = RfqState::LEN,
        bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
    /// System program used for initializing accounts
    pub system_program: Program<'info, System>,
    /// Token program used for initializing token accounts
    pub token_program: Program<'info, Token>,
}

/// Responds to quote.
#[derive(Accounts)]
pub struct Respond<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            (rfq.response_count + 1).to_string().as_bytes()
        ],
        space = OrderState::LEN,
        bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    #[account(
        mut,
        seeds = [RFQ_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
    #[account(mut)]
    pub asset_wallet: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub quote_wallet: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [ASSET_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.asset_escrow_bump
    )]
    pub asset_escrow: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [QUOTE_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.quote_escrow_bump
    )]
    pub quote_escrow: Box<Account<'info, TokenAccount>>,
    pub asset_mint: Box<Account<'info, Mint>>,
    pub quote_mint: Box<Account<'info, Mint>>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

/// Confirms RFQ response.
#[derive(Accounts)]
pub struct Confirm<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [RFQ_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
    #[account(mut)]
    pub asset_wallet: Box<Account<'info, TokenAccount>>,
    pub asset_mint: Box<Account<'info, Mint>>,
    #[account(
        mut,
        seeds = [ASSET_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.asset_escrow_bump,
    )]
    pub asset_escrow: Box<Account<'info, TokenAccount>>,
    // TODO: Is this actually an order or is there a better way?
    #[account(
        init,
        payer = authority,
        space = OrderState::LEN,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            b"0"
        ],
        bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    #[account(
        mut,
        seeds = [QUOTE_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.quote_escrow_bump
    )]
    pub quote_escrow: Box<Account<'info, TokenAccount>>,
    pub quote_mint: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub quote_wallet: Box<Account<'info, TokenAccount>>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

/// Last look for RFQ.
#[derive(Accounts)]
pub struct LastLook<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            order.id.to_string().as_bytes()
        ],
        bump = order.bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    #[account(
        mut,
        seeds = [RFQ_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
}

/// Returns collateral.
#[derive(Accounts)]
pub struct ReturnCollateral<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    pub asset_mint: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub asset_wallet: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub quote_wallet: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [ASSET_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.asset_escrow_bump
    )]
    pub asset_escrow: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            order.id.to_string().as_bytes()
        ],
        bump = order.bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    pub quote_mint: Box<Account<'info, Mint>>,
    #[account(
        mut,
        seeds = [QUOTE_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.quote_escrow_bump
    )]
    pub quote_escrow: Box<Account<'info, TokenAccount>>,
    pub rfq: Box<Account<'info, RfqState>>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

/// Settles RFQ.
#[derive(Accounts)]
pub struct Settle<'info> {
    pub asset_mint: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub asset_wallet: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [ASSET_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.asset_escrow_bump
    )]
    pub asset_escrow: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [QUOTE_ESCROW_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.quote_escrow_bump
    )]
    pub quote_escrow: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [
            ORDER_SEED.as_bytes(),
            rfq.id.to_string().as_bytes(),
            order.id.to_string().as_bytes()
        ],
        bump = order.bump
    )]
    pub order: Box<Account<'info, OrderState>>,
    #[account(
        mut,
        seeds = [RFQ_SEED.as_bytes(), rfq.id.to_string().as_bytes()],
        bump = rfq.bump
    )]
    pub rfq: Box<Account<'info, RfqState>>,
    #[account(mut)]
    pub quote_wallet: Box<Account<'info, TokenAccount>>,
    pub quote_mint: Box<Account<'info, Mint>>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

// Types

/// RFQ instrument type.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub enum Instrument {
    Call,
    Future,
    Put,
    Spot,
}

/// Side for RFQ.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub enum Side {
    Buy,
    Sell,
}

/// Venue for RFQ leg.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub enum Venue {
    Convergence,
    PsyOptions,
}

/// RFQ implementation.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub struct Leg {
    instrument: Instrument,
    venue: Venue,
    side: Side,
    amount: u64,
}

impl Leg {
    pub const LEN: usize = (1 + (1 * 4)) + (1 + (1 * 2)) + (1 + (1 * 2)) + (8 * 1);
}

/// Order.
#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug, PartialEq, Eq)]
pub enum Order {
    Buy,
    Sell,
    TwoWay,
}

// Access controls

/// Settlement access control. Ensures RFQ is:
///
/// 1. Confirmed
/// 2. Approved
pub fn settle_access_control<'info>(ctx: &Context<Settle<'info>>) -> Result<()> {
    require!(ctx.accounts.rfq.confirmed, ProtocolError::TradeNotConfirmed);
    require!(ctx.accounts.rfq.approved, ProtocolError::TradeNotApproved);
    Ok(())
}

/// Confirmation access control. Ensures confirmation is:
///
/// 1. Executed by taker
/// 2. Confirmation order is same as request order
pub fn confirm_access_control<'info>(
    ctx: &Context<Confirm<'info>>,
    confirm_order: Order,
) -> Result<()> {
    let rfq = &ctx.accounts.rfq;
    let taker_address = rfq.taker_address;
    let request_order = rfq.request_order;
    let authority = ctx.accounts.authority.key();

    // Make sure current authority matches original taker address from request instruction
    require!(
        taker_address == authority,
        ProtocolError::InvalidTakerAddress
    );

    match request_order {
        Order::Buy => require!(confirm_order == Order::Buy, ProtocolError::InvalidOrder),
        Order::Sell => require!(confirm_order == Order::Sell, ProtocolError::InvalidOrder),
        Order::TwoWay => require!(confirm_order == Order::TwoWay, ProtocolError::InvalidOrder),
    }

    Ok(())
}

/// Response access control. Ensures response satisfies the following conditions:
///
/// 1. RFQ authority is not the same as the taker authority
/// 2. RFQ is not expired
/// 3. Order amount is greater than 0
/// 4. If response is a bid the amount is greater than 0
/// 5. If response is an ask the amount is greater than 0
pub fn respond_access_control<'info>(
    ctx: &Context<Respond<'info>>,
    bid: Option<u64>,
    ask: Option<u64>,
) -> Result<()> {
    let authority = &ctx.accounts.authority;
    let rfq = &ctx.accounts.rfq;
    let expiry = rfq.expiry;
    let unix_timestamp = Clock::get().unwrap().unix_timestamp;
    let order_amount = rfq.order_amount;

    require!(
        rfq.authority.key() != authority.key(),
        ProtocolError::InvalidAuthorityAddress
    );
    require!(expiry > unix_timestamp, ProtocolError::ResponseTimeElapsed);
    require!(order_amount > 0, ProtocolError::InvalidOrderAmount);

    match bid {
        Some(b) => require!(b > 0, ProtocolError::InvalidQuote),
        None => (),
    }
    match ask {
        Some(a) => require!(a > 0, ProtocolError::InvalidQuote),
        None => (),
    }

    Ok(())
}

/// Return collateral access control. Ensures returning collateral for RFQ that is:
///
/// 1. Confirmed
/// 2. Collateral has not already by returned
pub fn return_collateral_access_control<'info>(ctx: &Context<ReturnCollateral>) -> Result<()> {
    let rfq = &ctx.accounts.rfq;
    let order = &ctx.accounts.order;

    require!(rfq.confirmed, ProtocolError::TradeNotConfirmed);
    require!(!order.collateral_returned, ProtocolError::TradeNotConfirmed);

    Ok(())
}

// Error handling

/// Error handling codes.
#[error_code]
pub enum ProtocolError {
    #[msg("Invalid order logic")]
    InvalidOrder,
    #[msg("Invalid quote")]
    InvalidQuote,
    #[msg("Invalid taker address")]
    InvalidTakerAddress,
    #[msg("Invalid authority address")]
    InvalidAuthorityAddress,
    #[msg("Invalid order amount")]
    InvalidOrderAmount,
    #[msg("Not implemented")]
    NotImplemented,
    #[msg("Trade has not been confirmed by taker")]
    TradeNotConfirmed,
    #[msg("Trade has not been approved via last look by maker")]
    TradeNotApproved,
    #[msg("Timed out on response to request")]
    ResponseTimeElapsed,
}

/// Private module for program instructions.
mod instructions {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        fee_denominator: u64,
        fee_numerator: u64,
    ) -> Result<()> {
        let protocol = &mut ctx.accounts.protocol;
        protocol.access_manager_count = 0;
        protocol.authority = ctx.accounts.authority.key();
        protocol.bump = *ctx.bumps.get(PROTOCOL_SEED).unwrap();
        protocol.fee_denominator = fee_denominator;
        protocol.fee_numerator = fee_numerator;
        protocol.rfq_count = 0;

        Ok(())
    }

    pub fn request(
        ctx: Context<Request>,
        expiry: i64,
        legs: Vec<Leg>,
        order_amount: u64,
        request_order: Order,
    ) -> Result<()> {
        let protocol = &mut ctx.accounts.protocol;
        protocol.rfq_count += 1;

        let rfq = &mut ctx.accounts.rfq;
        rfq.asset_escrow_bump = *ctx.bumps.get(ASSET_ESCROW_SEED).unwrap();
        rfq.asset_mint = ctx.accounts.asset_mint.key();
        rfq.authority = ctx.accounts.authority.key();
        rfq.approved = false;
        rfq.best_ask_address = None;
        rfq.best_ask_amount = None;
        rfq.best_bid_address = None;
        rfq.best_bid_amount = None;
        rfq.bump = *ctx.bumps.get(RFQ_SEED).unwrap();
        rfq.expiry = expiry;
        rfq.id = ctx.accounts.protocol.rfq_count;
        rfq.legs = vec![];
        rfq.order_amount = order_amount;
        rfq.quote_escrow_bump = *ctx.bumps.get(QUOTE_ESCROW_SEED).unwrap();
        rfq.quote_mint = ctx.accounts.quote_mint.key();
        rfq.request_order = request_order;
        rfq.response_count = 0;
        rfq.taker_address = *ctx.accounts.authority.key;
        rfq.unix_timestamp = Clock::get().unwrap().unix_timestamp;
        rfq.legs = legs;

        Ok(())
    }

    pub fn respond(ctx: Context<Respond>, bid: Option<u64>, ask: Option<u64>) -> Result<()> {
        let rfq = &mut ctx.accounts.rfq;
        let order_amount = rfq.order_amount;
        rfq.response_count += 1;

        let order = &mut ctx.accounts.order;
        let authority = ctx.accounts.authority.key();
        order.authority = authority;
        order.bump = *ctx.bumps.get(ORDER_SEED).unwrap();
        order.id = rfq.response_count;
        order.unix_timestamp = Clock::get().unwrap().unix_timestamp;

        match ask {
            Some(a) => {
                anchor_spl::token::transfer(
                    CpiContext::new(
                        ctx.accounts.token_program.to_account_info(),
                        anchor_spl::token::Transfer {
                            from: ctx.accounts.asset_wallet.to_account_info(),
                            to: ctx.accounts.asset_escrow.to_account_info(),
                            authority: ctx.accounts.authority.to_account_info(),
                        },
                    ),
                    order_amount, // Collateral is an asset token amount
                )?;

                order.ask = Some(a);

                if rfq.best_ask_amount.is_none() || a < rfq.best_ask_amount.unwrap() {
                    rfq.best_ask_amount = Some(a);
                    rfq.best_ask_address = Some(authority);
                }
            }
            None => (),
        }

        match bid {
            Some(b) => {
                anchor_spl::token::transfer(
                    CpiContext::new(
                        ctx.accounts.token_program.to_account_info(),
                        anchor_spl::token::Transfer {
                            from: ctx.accounts.quote_wallet.to_account_info(),
                            to: ctx.accounts.quote_escrow.to_account_info(),
                            authority: ctx.accounts.authority.to_account_info(),
                        },
                    ),
                    b, // Collateral is a quote token amount
                )?;

                order.bid = bid;

                if rfq.best_bid_amount.is_none() || b > rfq.best_bid_amount.unwrap() {
                    rfq.best_bid_amount = Some(b);
                    rfq.best_bid_address = Some(authority);
                }
            }
            None => (),
        }

        Ok(())
    }

    pub fn confirm(ctx: Context<Confirm>, confirm_order: Order) -> Result<()> {
        let order = &mut ctx.accounts.order;
        order.bump = *ctx.bumps.get(ORDER_SEED).unwrap();
        order.id = 0;

        let rfq = &mut ctx.accounts.rfq;
        rfq.confirmed = true;
        rfq.confirm_order = confirm_order;

        match confirm_order {
            Order::Buy => {
                // Taker wants to buy asset token, needs to post quote token as collateral
                anchor_spl::token::transfer(
                    CpiContext::new(
                        ctx.accounts.token_program.to_account_info(),
                        anchor_spl::token::Transfer {
                            from: ctx.accounts.quote_wallet.to_account_info(),
                            to: ctx.accounts.quote_escrow.to_account_info(),
                            authority: ctx.accounts.authority.to_account_info(),
                        },
                    ),
                    rfq.best_ask_amount.unwrap(),
                )?;
            }
            Order::Sell => {
                anchor_spl::token::transfer(
                    CpiContext::new(
                        ctx.accounts.token_program.to_account_info(),
                        anchor_spl::token::Transfer {
                            from: ctx.accounts.asset_wallet.to_account_info(),
                            to: ctx.accounts.asset_escrow.to_account_info(),
                            authority: ctx.accounts.authority.to_account_info(),
                        },
                    ),
                    rfq.best_bid_amount.unwrap(),
                )?;
            }
            Order::TwoWay => return Err(error!(ProtocolError::NotImplemented)),
        }

        Ok(())
    }

    pub fn last_look(ctx: Context<LastLook>) -> Result<()> {
        let rfq = &mut ctx.accounts.rfq;
        let order = &ctx.accounts.order;

        let is_winner = match rfq.confirm_order {
            Order::Buy => rfq.best_ask_amount.unwrap() == order.ask.unwrap(),
            Order::Sell => rfq.best_bid_amount.unwrap() == order.bid.unwrap(),
            Order::TwoWay => return Err(error!(ProtocolError::NotImplemented)),
        };

        if is_winner {
            rfq.approved = true;
        }

        Ok(())
    }

    pub fn return_collateral(ctx: Context<ReturnCollateral>) -> Result<()> {
        let rfq = &ctx.accounts.rfq;
        let order = &mut ctx.accounts.order;
        order.collateral_returned = true;

        if order.ask.is_some()
            && (rfq.best_ask_amount.unwrap() != order.ask.unwrap()
                || rfq.confirm_order == Order::Sell)
        {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.asset_escrow.to_account_info(),
                        to: ctx.accounts.asset_wallet.to_account_info(),
                        authority: rfq.to_account_info(),
                    },
                    &[
                        &[
                            ASSET_ESCROW_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.asset_escrow_bump],
                        ][..],
                        &[
                            RFQ_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.bump],
                        ][..],
                    ],
                ),
                rfq.order_amount,
            )?;
        }

        if order.bid.is_some()
            && (rfq.best_ask_amount.unwrap() != order.ask.unwrap()
                || rfq.confirm_order == Order::Buy)
        {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.quote_escrow.to_account_info(),
                        to: ctx.accounts.quote_wallet.to_account_info(),
                        authority: rfq.to_account_info(),
                    },
                    &[
                        &[
                            QUOTE_ESCROW_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.quote_escrow_bump],
                        ][..],
                        &[
                            RFQ_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.bump],
                        ][..],
                    ],
                ),
                order.bid.unwrap(),
            )?;
        }

        Ok(())
    }

    pub fn settle(ctx: Context<Settle>) -> Result<()> {
        let rfq = &ctx.accounts.rfq;
        let confirm_order = rfq.confirm_order;
        let taker_address = rfq.taker_address;

        let order = &ctx.accounts.order;
        let authority_address = *ctx.accounts.authority.to_account_info().key;

        let mut quote_amount = 0;
        let mut asset_amount = 0;

        match confirm_order {
            Order::Buy => {
                if authority_address == taker_address {
                    asset_amount = rfq.order_amount;
                }
                if order.ask.is_some() && rfq.best_ask_amount.unwrap() == order.ask.unwrap() {
                    quote_amount = order.ask.unwrap();
                }
            }
            Order::Sell => {
                if authority_address == taker_address {
                    quote_amount = rfq.best_bid_amount.unwrap();
                }
                if order.bid.is_some() && rfq.best_bid_amount.unwrap() == order.bid.unwrap() {
                    asset_amount = rfq.order_amount;
                }
            }
            Order::TwoWay => return Err(error!(ProtocolError::NotImplemented)),
        }

        if asset_amount > 0 {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.asset_escrow.to_account_info(),
                        to: ctx.accounts.asset_wallet.to_account_info(),
                        authority: rfq.to_account_info(),
                    },
                    &[
                        &[
                            ASSET_ESCROW_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.asset_escrow_bump],
                        ][..],
                        &[
                            RFQ_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.bump],
                        ][..],
                    ],
                ),
                asset_amount,
            )?;
        }

        if quote_amount > 0 {
            anchor_spl::token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::token::Transfer {
                        from: ctx.accounts.quote_escrow.to_account_info(),
                        to: ctx.accounts.quote_wallet.to_account_info(),
                        authority: rfq.to_account_info(),
                    },
                    &[
                        &[
                            QUOTE_ESCROW_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.quote_escrow_bump],
                        ][..],
                        &[
                            RFQ_SEED.as_bytes(),
                            rfq.id.to_string().as_bytes(),
                            &[rfq.bump],
                        ][..],
                    ],
                ),
                quote_amount,
            )?;
        }

        // TODO: This function gets called multiple times so decide when to settle
        for l in rfq.legs.iter() {
            match l.venue {
                Venue::PsyOptions => {
                    // TODO: Finish @uwecerron
                    //
                    // Add instructions for PsyOptions
                    //
                    // Create_Portfolio
                    // Deposit
                    // Place_Orders
                }
                Venue::Convergence => (),
            }
        }

        Ok(())
    }
}
