//! Error handling
use anchor_lang::prelude::*;

/// Error codes.
#[error_code]
pub enum PsyoptionsEuropeanError {
    #[msg("Invalid data size")]
    InvalidDataSize,
    #[msg("Passed mint account does not match")]
    PassedMintDoesNotMatch,
    #[msg("Passed euro meta account does not match")]
    PassedEuroMetaDoesNotMatch,
    #[msg("Decimals amount in the leg does not match value in mint")]
    DecimalsAmountDoesNotMatch,
    #[msg("Base asset in a leg does not match a value for this mint")]
    BaseAssetDoesNotMatch,
    #[msg("Passed account is not an associated token account of a receiver")]
    InvalidReceiver,
    #[msg("Passed backup address should be an associated account of protocol owner")]
    InvalidBackupAddress,
    #[msg("Passed address is not of a party first to prepare for settlement")]
    NotFirstToPrepare,
    #[msg("Passed underlying amount per contract does not match")]
    PassedUnderlyingAmountPerContractDoesNotMatch,
    #[msg("Passed strike price does not match")]
    PassedStrikePriceDoesNotMatch,
    #[msg("Passed expiration timestamp does not match")]
    PassedExpirationTimestampDoesNotMatch,
}
