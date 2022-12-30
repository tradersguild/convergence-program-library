export type Dex = {
    "version": "0.1.0",
    "name": "dex",
    "constants": [
        {
            "name": "NAME_LEN",
            "type": "u64",
            "value": "16"
        },
        {
            "name": "MAX_OUTRIGHTS",
            "type": "u64",
            "value": "128"
        },
        {
            "name": "MAX_PRODUCTS",
            "type": "u64",
            "value": "256"
        },
        {
            "name": "HEALTH_BUFFER_LEN",
            "type": "u64",
            "value": "32"
        },
        {
            "name": "MAX_TRADER_POSITIONS",
            "type": "u64",
            "value": "16"
        },
        {
            "name": "MAX_OPEN_ORDERS_PER_POSITION",
            "type": "u64",
            "value": "256"
        },
        {
            "name": "MAX_OPEN_ORDERS",
            "type": "u64",
            "value": "1024"
        },
        {
            "name": "ANCHOR_DISCRIMINANT_LEN",
            "type": "u64",
            "value": "8"
        },
        {
            "name": "SENTINEL",
            "type": "u64",
            "value": "0"
        },
        {
            "name": "CALLBACK_INFO_LEN",
            "type": "u64",
            "value": "40"
        },
        {
            "name": "CALLBACK_ID_LEN",
            "type": "u64",
            "value": "32"
        },
        {
            "name": "MAX_COMBOS",
            "type": "u64",
            "value": "128"
        },
        {
            "name": "MAX_LEGS",
            "type": "u64",
            "value": "4"
        },
        {
            "name": "SLOTS_1_MIN",
            "type": "u64",
            "value": "150"
        },
        {
            "name": "SLOTS_5_MIN",
            "type": "u64",
            "value": "750"
        },
        {
            "name": "SLOTS_15_MIN",
            "type": "u64",
            "value": "2250"
        },
        {
            "name": "SLOTS_60_MIN",
            "type": "u64",
            "value": "9000"
        }
    ],
    "instructions": [
        {
            "name": "initializeMarketProduct",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeMarketProductParams"
                    }
                }
            ]
        },
        {
            "name": "removeMarketProduct",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "bids",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "asks",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "initializePrintTrade",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "creator",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "counterparty",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "operator",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "printTrade",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializePrintTradeParams"
                    }
                }
            ]
        },
        {
            "name": "signPrintTrade",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "creator",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "counterparty",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "operator",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "printTrade",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskAndFeeSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "creatorTraderFeeStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creatorTraderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "counterpartyTraderFeeStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "counterpartyTraderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "SignPrintTradeParams"
                    }
                }
            ]
        },
        {
            "name": "initializeTraderRiskGroup",
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAcct",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "traderFeeStateAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "newOrder",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "bids",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "asks",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "traderFeeStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskAndFeeSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "NewOrderParams"
                    }
                }
            ]
        },
        {
            "name": "consumeOrderbookEvents",
            "accounts": [
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "rewardTarget",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "feeModelProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskAndFeeSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "ConsumeOrderbookEventsParams"
                    }
                }
            ]
        },
        {
            "name": "cancelOrder",
            "accounts": [
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "bids",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "asks",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "CancelOrderParams"
                    }
                }
            ]
        },
        {
            "name": "depositFunds",
            "accounts": [
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "userTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroupVault",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "DepositFundsParams"
                    }
                }
            ]
        },
        {
            "name": "withdrawFunds",
            "accounts": [
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "userTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroupVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "WithdrawFundsParams"
                    }
                }
            ]
        },
        {
            "name": "updateProductFunding",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateProductFundingParams"
                    }
                }
            ]
        },
        {
            "name": "transferFullPosition",
            "accounts": [
                {
                    "name": "liquidator",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "liquidateeRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "liquidatorRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "liquidatorRiskStateAccountInfo",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "liquidateeRiskStateAccountInfo",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "initializeCombo",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeComboParams"
                    }
                }
            ]
        },
        {
            "name": "updateTraderFunding",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAccountInfo",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "clearExpiredOrderbook",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "bids",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "asks",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "ClearExpiredOrderbookParams"
                    }
                }
            ]
        },
        {
            "name": "sweepFees",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeCollector",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroupVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeCollectorTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "chooseSuccessor",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "newAuthority",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "claimAuthority",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "newAuthority",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "PrintTrade",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "isInitialized",
                        "type": "bool"
                    },
                    {
                        "name": "creator",
                        "type": "publicKey"
                    },
                    {
                        "name": "counterparty",
                        "type": "publicKey"
                    },
                    {
                        "name": "marketProductGroup",
                        "type": "publicKey"
                    },
                    {
                        "name": "product",
                        "type": "publicKey"
                    },
                    {
                        "name": "size",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "price",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "operator",
                        "type": "publicKey"
                    },
                    {
                        "name": "operatorCreatorFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "operatorCounterpartyFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "TraderRiskGroup",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "tag",
                        "type": {
                            "defined": "AccountTag"
                        }
                    },
                    {
                        "name": "marketProductGroup",
                        "type": "publicKey"
                    },
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "activeProducts",
                        "type": {
                            "array": [
                                "u8",
                                128
                            ]
                        }
                    },
                    {
                        "name": "totalDeposited",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "totalWithdrawn",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "cashBalance",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "pendingCashBalance",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "pendingFees",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "validUntil",
                        "type": "i64"
                    },
                    {
                        "name": "makerFeeBps",
                        "type": "i32"
                    },
                    {
                        "name": "takerFeeBps",
                        "type": "i32"
                    },
                    {
                        "name": "traderPositions",
                        "type": {
                            "array": [
                                {
                                    "defined": "TraderPosition"
                                },
                                16
                            ]
                        }
                    },
                    {
                        "name": "riskStateAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "feeStateAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "clientOrderId",
                        "type": "u128"
                    },
                    {
                        "name": "openOrders",
                        "type": {
                            "defined": "OpenOrders"
                        }
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "SignPrintTradeParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "size",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "price",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "operatorCreatorFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "operatorCounterpartyFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "InitializePrintTradeParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "size",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "price",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "operatorCreatorFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "operatorCounterpartyFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "Params",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "quantity",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "CallBackInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "userAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "openOrdersIdx",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "Fractional",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "m",
                        "type": "i64"
                    },
                    {
                        "name": "exp",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "Side",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Bid"
                    },
                    {
                        "name": "Ask"
                    }
                ]
            }
        },
        {
            "name": "SelfTradeBehavior",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "DecrementTake"
                    },
                    {
                        "name": "CancelProvide"
                    },
                    {
                        "name": "AbortTransaction"
                    }
                ]
            }
        },
        {
            "name": "TraderFees",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "validUntil",
                        "type": "i64"
                    },
                    {
                        "name": "makerFeeBps",
                        "type": "i32"
                    },
                    {
                        "name": "takerFeeBps",
                        "type": "i32"
                    }
                ]
            }
        },
        {
            "name": "TraderFeeParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "isAggressor",
                        "type": "bool"
                    },
                    {
                        "name": "matchedQuoteQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "matchedBaseQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "product",
                        "type": "publicKey"
                    }
                ]
            }
        },
        {
            "name": "PriceEwma",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "ewmaBid",
                        "type": {
                            "array": [
                                {
                                    "defined": "Fractional"
                                },
                                4
                            ]
                        }
                    },
                    {
                        "name": "ewmaAsk",
                        "type": {
                            "array": [
                                {
                                    "defined": "Fractional"
                                },
                                4
                            ]
                        }
                    },
                    {
                        "name": "bid",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "ask",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "slot",
                        "type": "u64"
                    },
                    {
                        "name": "prevBid",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "prevAsk",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "OpenOrdersMetadata",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "askQtyInBook",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "bidQtyInBook",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "headIndex",
                        "type": "u64"
                    },
                    {
                        "name": "numOpenOrders",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "OpenOrders",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "freeListHead",
                        "type": "u64"
                    },
                    {
                        "name": "totalOpenOrders",
                        "type": "u64"
                    },
                    {
                        "name": "products",
                        "type": {
                            "array": [
                                {
                                    "defined": "OpenOrdersMetadata"
                                },
                                256
                            ]
                        }
                    },
                    {
                        "name": "orders",
                        "type": {
                            "array": [
                                {
                                    "defined": "OpenOrdersNode"
                                },
                                1024
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "OpenOrdersNode",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "id",
                        "type": "u128"
                    },
                    {
                        "name": "clientId",
                        "type": "u128"
                    },
                    {
                        "name": "prev",
                        "type": "u64"
                    },
                    {
                        "name": "next",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "Outright",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "metadata",
                        "type": {
                            "defined": "ProductMetadata"
                        }
                    },
                    {
                        "name": "numQueueEvents",
                        "type": "u64"
                    },
                    {
                        "name": "productStatus",
                        "type": {
                            "defined": "ProductStatus"
                        }
                    },
                    {
                        "name": "dust",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "cumFundingPerShare",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "cumSocialLossPerShare",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "openLongInterest",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "openShortInterest",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "padding",
                        "type": {
                            "array": [
                                "u64",
                                14
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "ProductMetadata",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u64"
                    },
                    {
                        "name": "productKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "name",
                        "type": {
                            "array": [
                                "u8",
                                16
                            ]
                        }
                    },
                    {
                        "name": "orderbook",
                        "type": "publicKey"
                    },
                    {
                        "name": "tickSize",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "baseDecimals",
                        "type": "u64"
                    },
                    {
                        "name": "priceOffset",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "contractVolume",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "prices",
                        "type": {
                            "defined": "PriceEwma"
                        }
                    }
                ]
            }
        },
        {
            "name": "ProductStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Uninitialized"
                    },
                    {
                        "name": "Initialized"
                    },
                    {
                        "name": "Expired"
                    }
                ]
            }
        },
        {
            "name": "Combo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "metadata",
                        "type": {
                            "defined": "ProductMetadata"
                        }
                    },
                    {
                        "name": "numLegs",
                        "type": "u64"
                    },
                    {
                        "name": "legs",
                        "type": {
                            "array": [
                                {
                                    "defined": "Leg"
                                },
                                4
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "Leg",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "productKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "ratio",
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "HealthInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "health",
                        "type": {
                            "defined": "HealthStatus"
                        }
                    },
                    {
                        "name": "action",
                        "type": {
                            "defined": "ActionStatus"
                        }
                    }
                ]
            }
        },
        {
            "name": "HealthStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Healthy"
                    },
                    {
                        "name": "Unhealthy"
                    },
                    {
                        "name": "Liquidatable"
                    },
                    {
                        "name": "NotLiquidatable"
                    }
                ]
            }
        },
        {
            "name": "ActionStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Approved"
                    },
                    {
                        "name": "NotApproved"
                    }
                ]
            }
        },
        {
            "name": "SocialLoss",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "amount",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "LiquidationInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "health",
                        "type": {
                            "defined": "HealthStatus"
                        }
                    },
                    {
                        "name": "action",
                        "type": {
                            "defined": "ActionStatus"
                        }
                    },
                    {
                        "name": "totalSocialLoss",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "liquidationPrice",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "socialLosses",
                        "type": {
                            "array": [
                                {
                                    "defined": "SocialLoss"
                                },
                                16
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "DexError",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "ContractIsExpired"
                    },
                    {
                        "name": "ContractIsNotExpired"
                    },
                    {
                        "name": "InvalidSystemProgramAccount"
                    },
                    {
                        "name": "InvalidAobProgramAccount"
                    },
                    {
                        "name": "InvalidStateAccountOwner"
                    },
                    {
                        "name": "InvalidOrderIndex"
                    },
                    {
                        "name": "UserAccountFull"
                    },
                    {
                        "name": "TransactionAborted"
                    },
                    {
                        "name": "MissingUserAccount"
                    },
                    {
                        "name": "OrderNotFound"
                    },
                    {
                        "name": "NoOp"
                    },
                    {
                        "name": "OutofFunds"
                    },
                    {
                        "name": "UserAccountStillActive"
                    },
                    {
                        "name": "MarketStillActive"
                    },
                    {
                        "name": "InvalidMarketSignerAccount"
                    },
                    {
                        "name": "InvalidOrderbookAccount"
                    },
                    {
                        "name": "InvalidMarketAdminAccount"
                    },
                    {
                        "name": "InvalidBaseVaultAccount"
                    },
                    {
                        "name": "InvalidQuoteVaultAccount"
                    },
                    {
                        "name": "FullMarketProductGroup"
                    },
                    {
                        "name": "MissingMarketProduct"
                    },
                    {
                        "name": "InvalidWithdrawalAmount"
                    },
                    {
                        "name": "InvalidTakerTrader"
                    },
                    {
                        "name": "FundsError"
                    },
                    {
                        "name": "InactiveProductError"
                    },
                    {
                        "name": "TooManyOpenOrdersError"
                    },
                    {
                        "name": "NoMoreOpenOrdersError"
                    },
                    {
                        "name": "NonZeroPriceTickExponentError"
                    },
                    {
                        "name": "DuplicateProductNameError"
                    },
                    {
                        "name": "InvalidRiskResponseError"
                    },
                    {
                        "name": "InvalidAccountHealthError"
                    },
                    {
                        "name": "OrderbookIsEmptyError"
                    },
                    {
                        "name": "CombosNotRemoved"
                    },
                    {
                        "name": "AccountNotLiquidable"
                    },
                    {
                        "name": "FundingPrecisionError"
                    },
                    {
                        "name": "ProductDecimalPrecisionError"
                    },
                    {
                        "name": "ProductNotOutright"
                    },
                    {
                        "name": "ProductNotCombo"
                    },
                    {
                        "name": "InvalidSocialLossCalculation"
                    },
                    {
                        "name": "ProductIndexMismatch"
                    },
                    {
                        "name": "InvalidOrderID"
                    },
                    {
                        "name": "InvalidBytesForZeroCopyDeserialization"
                    }
                ]
            }
        },
        {
            "name": "OrderInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "totalOrderQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "matchedOrderQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "orderSide",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "isCombo",
                        "type": "bool"
                    },
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "operationType",
                        "type": {
                            "defined": "OperationType"
                        }
                    },
                    {
                        "name": "oldAskQtyInBook",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "oldBidQtyInBook",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "OperationType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "NewOrder"
                    },
                    {
                        "name": "CancelOrder"
                    },
                    {
                        "name": "CheckHealth"
                    },
                    {
                        "name": "PositionTransfer"
                    },
                    {
                        "name": "ConsumeEvents"
                    }
                ]
            }
        },
        {
            "name": "AccountTag",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Uninitialized"
                    },
                    {
                        "name": "MarketProductGroup"
                    },
                    {
                        "name": "TraderRiskGroup"
                    },
                    {
                        "name": "TraderPosition"
                    },
                    {
                        "name": "MarketProductGroupWithCombos"
                    },
                    {
                        "name": "ComboGroup"
                    },
                    {
                        "name": "Combo"
                    },
                    {
                        "name": "RiskProfile"
                    }
                ]
            }
        },
        {
            "name": "TraderPosition",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "tag",
                        "type": {
                            "defined": "AccountTag"
                        }
                    },
                    {
                        "name": "productKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "position",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "pendingPosition",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "lastCumFundingSnapshot",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "lastSocialLossSnapshot",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "Bitset",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "inner",
                        "type": {
                            "array": [
                                "u128",
                                2
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "InitializeMarketProductGroupParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "name",
                        "type": {
                            "array": [
                                "u8",
                                16
                            ]
                        }
                    },
                    {
                        "name": "validateAccountDiscriminantLen",
                        "type": "u64"
                    },
                    {
                        "name": "findFeesDiscriminantLen",
                        "type": "u64"
                    },
                    {
                        "name": "validateAccountHealthDiscriminant",
                        "type": {
                            "array": [
                                "u8",
                                8
                            ]
                        }
                    },
                    {
                        "name": "validateAccountLiquidationDiscriminant",
                        "type": {
                            "array": [
                                "u8",
                                8
                            ]
                        }
                    },
                    {
                        "name": "createRiskStateAccountDiscriminant",
                        "type": {
                            "array": [
                                "u8",
                                8
                            ]
                        }
                    },
                    {
                        "name": "findFeesDiscriminant",
                        "type": {
                            "array": [
                                "u8",
                                8
                            ]
                        }
                    },
                    {
                        "name": "maxMakerFeeBps",
                        "type": "i16"
                    },
                    {
                        "name": "minMakerFeeBps",
                        "type": "i16"
                    },
                    {
                        "name": "maxTakerFeeBps",
                        "type": "i16"
                    },
                    {
                        "name": "minTakerFeeBps",
                        "type": "i16"
                    }
                ]
            }
        },
        {
            "name": "InitializeMarketProductParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "name",
                        "type": {
                            "array": [
                                "u8",
                                16
                            ]
                        }
                    },
                    {
                        "name": "tickSize",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "baseDecimals",
                        "type": "u64"
                    },
                    {
                        "name": "priceOffset",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "OrderType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Limit"
                    },
                    {
                        "name": "ImmediateOrCancel"
                    },
                    {
                        "name": "FillOrKill"
                    },
                    {
                        "name": "PostOnly"
                    }
                ]
            }
        },
        {
            "name": "NewOrderParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "maxBaseQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "orderType",
                        "type": {
                            "defined": "OrderType"
                        }
                    },
                    {
                        "name": "selfTradeBehavior",
                        "type": {
                            "defined": "SelfTradeBehavior"
                        }
                    },
                    {
                        "name": "matchLimit",
                        "type": "u64"
                    },
                    {
                        "name": "limitPrice",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "ConsumeOrderbookEventsParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "maxIterations",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "CancelOrderParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "orderId",
                        "type": "u128"
                    }
                ]
            }
        },
        {
            "name": "DepositFundsParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "quantity",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "WithdrawFundsParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "quantity",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "UpdateProductFundingParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "amount",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "expired",
                        "type": "bool"
                    }
                ]
            }
        },
        {
            "name": "InitializeComboParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "name",
                        "type": {
                            "array": [
                                "u8",
                                16
                            ]
                        }
                    },
                    {
                        "name": "tickSize",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "priceOffset",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "baseDecimals",
                        "type": "u64"
                    },
                    {
                        "name": "ratios",
                        "type": {
                            "vec": "i8"
                        }
                    }
                ]
            }
        },
        {
            "name": "ClearExpiredOrderbookParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "numOrdersToCancel",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "UtilError",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "AccountAlreadyInitialized"
                    },
                    {
                        "name": "AccountUninitialized"
                    },
                    {
                        "name": "DuplicateProductKey"
                    },
                    {
                        "name": "PublicKeyMismatch"
                    },
                    {
                        "name": "AssertionError"
                    },
                    {
                        "name": "InvalidMintAuthority"
                    },
                    {
                        "name": "IncorrectOwner"
                    },
                    {
                        "name": "PublicKeysShouldBeUnique"
                    },
                    {
                        "name": "NotRentExempt"
                    },
                    {
                        "name": "NumericalOverflow"
                    },
                    {
                        "name": "RoundError"
                    },
                    {
                        "name": "DivisionbyZero"
                    },
                    {
                        "name": "InvalidReturnValue"
                    },
                    {
                        "name": "SqrtRootError"
                    },
                    {
                        "name": "ZeroPriceError"
                    },
                    {
                        "name": "ZeroQuantityError"
                    },
                    {
                        "name": "SerializeError"
                    },
                    {
                        "name": "DeserializeError"
                    },
                    {
                        "name": "InvalidBitsetIndex"
                    }
                ]
            }
        }
    ],
    "events": [
        {
            "name": "DexOrderSummary",
            "fields": [
                {
                    "name": "postedOrderId",
                    "type": {
                        "option": "u128"
                    },
                    "index": false
                },
                {
                    "name": "totalBaseQty",
                    "type": "u64",
                    "index": false
                },
                {
                    "name": "totalQuoteQty",
                    "type": "u64",
                    "index": false
                },
                {
                    "name": "totalBaseQtyPosted",
                    "type": "u64",
                    "index": false
                }
            ]
        }
    ]
}

export const DexIdl: Dex = {
    "version": "0.1.0",
    "name": "dex",
    "constants": [
        {
            "name": "NAME_LEN",
            "type": "u64",
            "value": "16"
        },
        {
            "name": "MAX_OUTRIGHTS",
            "type": "u64",
            "value": "128"
        },
        {
            "name": "MAX_PRODUCTS",
            "type": "u64",
            "value": "256"
        },
        {
            "name": "HEALTH_BUFFER_LEN",
            "type": "u64",
            "value": "32"
        },
        {
            "name": "MAX_TRADER_POSITIONS",
            "type": "u64",
            "value": "16"
        },
        {
            "name": "MAX_OPEN_ORDERS_PER_POSITION",
            "type": "u64",
            "value": "256"
        },
        {
            "name": "MAX_OPEN_ORDERS",
            "type": "u64",
            "value": "1024"
        },
        {
            "name": "ANCHOR_DISCRIMINANT_LEN",
            "type": "u64",
            "value": "8"
        },
        {
            "name": "SENTINEL",
            "type": "u64",
            "value": "0"
        },
        {
            "name": "CALLBACK_INFO_LEN",
            "type": "u64",
            "value": "40"
        },
        {
            "name": "CALLBACK_ID_LEN",
            "type": "u64",
            "value": "32"
        },
        {
            "name": "MAX_COMBOS",
            "type": "u64",
            "value": "128"
        },
        {
            "name": "MAX_LEGS",
            "type": "u64",
            "value": "4"
        },
        {
            "name": "SLOTS_1_MIN",
            "type": "u64",
            "value": "150"
        },
        {
            "name": "SLOTS_5_MIN",
            "type": "u64",
            "value": "750"
        },
        {
            "name": "SLOTS_15_MIN",
            "type": "u64",
            "value": "2250"
        },
        {
            "name": "SLOTS_60_MIN",
            "type": "u64",
            "value": "9000"
        }
    ],
    "instructions": [
        {
            "name": "initializeMarketProduct",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeMarketProductParams"
                    }
                }
            ]
        },
        {
            "name": "removeMarketProduct",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "bids",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "asks",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "initializePrintTrade",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "creator",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "counterparty",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "operator",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "printTrade",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializePrintTradeParams"
                    }
                }
            ]
        },
        {
            "name": "signPrintTrade",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "creator",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "counterparty",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "operator",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "printTrade",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskAndFeeSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "creatorTraderFeeStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creatorTraderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "counterpartyTraderFeeStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "counterpartyTraderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "SignPrintTradeParams"
                    }
                }
            ]
        },
        {
            "name": "initializeTraderRiskGroup",
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAcct",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "traderFeeStateAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "newOrder",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "bids",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "asks",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "traderFeeStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskAndFeeSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "NewOrderParams"
                    }
                }
            ]
        },
        {
            "name": "consumeOrderbookEvents",
            "accounts": [
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "rewardTarget",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "feeModelProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskAndFeeSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "ConsumeOrderbookEventsParams"
                    }
                }
            ]
        },
        {
            "name": "cancelOrder",
            "accounts": [
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "bids",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "asks",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "CancelOrderParams"
                    }
                }
            ]
        },
        {
            "name": "depositFunds",
            "accounts": [
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "userTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroupVault",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "DepositFundsParams"
                    }
                }
            ]
        },
        {
            "name": "withdrawFunds",
            "accounts": [
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "userTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroupVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAcct",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "WithdrawFundsParams"
                    }
                }
            ]
        },
        {
            "name": "updateProductFunding",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateProductFundingParams"
                    }
                }
            ]
        },
        {
            "name": "transferFullPosition",
            "accounts": [
                {
                    "name": "liquidator",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "liquidateeRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "liquidatorRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "liquidatorRiskStateAccountInfo",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "liquidateeRiskStateAccountInfo",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "initializeCombo",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeComboParams"
                    }
                }
            ]
        },
        {
            "name": "updateTraderFunding",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskEngineProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskOutputRegister",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "traderRiskStateAccountInfo",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "riskModelConfigurationAcct",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "riskSigner",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "clearExpiredOrderbook",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "product",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "aaobProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "orderbook",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "marketSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "bids",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "asks",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "ClearExpiredOrderbookParams"
                    }
                }
            ]
        },
        {
            "name": "sweepFees",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeCollector",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketProductGroupVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeCollectorTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "chooseSuccessor",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "newAuthority",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "claimAuthority",
            "accounts": [
                {
                    "name": "marketProductGroup",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "newAuthority",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "PrintTrade",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "isInitialized",
                        "type": "bool"
                    },
                    {
                        "name": "creator",
                        "type": "publicKey"
                    },
                    {
                        "name": "counterparty",
                        "type": "publicKey"
                    },
                    {
                        "name": "marketProductGroup",
                        "type": "publicKey"
                    },
                    {
                        "name": "product",
                        "type": "publicKey"
                    },
                    {
                        "name": "size",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "price",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "operator",
                        "type": "publicKey"
                    },
                    {
                        "name": "operatorCreatorFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "operatorCounterpartyFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "TraderRiskGroup",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "tag",
                        "type": {
                            "defined": "AccountTag"
                        }
                    },
                    {
                        "name": "marketProductGroup",
                        "type": "publicKey"
                    },
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "activeProducts",
                        "type": {
                            "array": [
                                "u8",
                                128
                            ]
                        }
                    },
                    {
                        "name": "totalDeposited",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "totalWithdrawn",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "cashBalance",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "pendingCashBalance",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "pendingFees",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "validUntil",
                        "type": "i64"
                    },
                    {
                        "name": "makerFeeBps",
                        "type": "i32"
                    },
                    {
                        "name": "takerFeeBps",
                        "type": "i32"
                    },
                    {
                        "name": "traderPositions",
                        "type": {
                            "array": [
                                {
                                    "defined": "TraderPosition"
                                },
                                16
                            ]
                        }
                    },
                    {
                        "name": "riskStateAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "feeStateAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "clientOrderId",
                        "type": "u128"
                    },
                    {
                        "name": "openOrders",
                        "type": {
                            "defined": "OpenOrders"
                        }
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "SignPrintTradeParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "size",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "price",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "operatorCreatorFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "operatorCounterpartyFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "InitializePrintTradeParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "size",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "price",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "operatorCreatorFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "operatorCounterpartyFeeProportion",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "Params",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "quantity",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "CallBackInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "userAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "openOrdersIdx",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "Fractional",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "m",
                        "type": "i64"
                    },
                    {
                        "name": "exp",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "Side",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Bid"
                    },
                    {
                        "name": "Ask"
                    }
                ]
            }
        },
        {
            "name": "SelfTradeBehavior",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "DecrementTake"
                    },
                    {
                        "name": "CancelProvide"
                    },
                    {
                        "name": "AbortTransaction"
                    }
                ]
            }
        },
        {
            "name": "TraderFees",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "validUntil",
                        "type": "i64"
                    },
                    {
                        "name": "makerFeeBps",
                        "type": "i32"
                    },
                    {
                        "name": "takerFeeBps",
                        "type": "i32"
                    }
                ]
            }
        },
        {
            "name": "TraderFeeParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "isAggressor",
                        "type": "bool"
                    },
                    {
                        "name": "matchedQuoteQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "matchedBaseQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "product",
                        "type": "publicKey"
                    }
                ]
            }
        },
        {
            "name": "PriceEwma",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "ewmaBid",
                        "type": {
                            "array": [
                                {
                                    "defined": "Fractional"
                                },
                                4
                            ]
                        }
                    },
                    {
                        "name": "ewmaAsk",
                        "type": {
                            "array": [
                                {
                                    "defined": "Fractional"
                                },
                                4
                            ]
                        }
                    },
                    {
                        "name": "bid",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "ask",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "slot",
                        "type": "u64"
                    },
                    {
                        "name": "prevBid",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "prevAsk",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "OpenOrdersMetadata",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "askQtyInBook",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "bidQtyInBook",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "headIndex",
                        "type": "u64"
                    },
                    {
                        "name": "numOpenOrders",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "OpenOrders",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "freeListHead",
                        "type": "u64"
                    },
                    {
                        "name": "totalOpenOrders",
                        "type": "u64"
                    },
                    {
                        "name": "products",
                        "type": {
                            "array": [
                                {
                                    "defined": "OpenOrdersMetadata"
                                },
                                256
                            ]
                        }
                    },
                    {
                        "name": "orders",
                        "type": {
                            "array": [
                                {
                                    "defined": "OpenOrdersNode"
                                },
                                1024
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "OpenOrdersNode",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "id",
                        "type": "u128"
                    },
                    {
                        "name": "clientId",
                        "type": "u128"
                    },
                    {
                        "name": "prev",
                        "type": "u64"
                    },
                    {
                        "name": "next",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "Outright",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "metadata",
                        "type": {
                            "defined": "ProductMetadata"
                        }
                    },
                    {
                        "name": "numQueueEvents",
                        "type": "u64"
                    },
                    {
                        "name": "productStatus",
                        "type": {
                            "defined": "ProductStatus"
                        }
                    },
                    {
                        "name": "dust",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "cumFundingPerShare",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "cumSocialLossPerShare",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "openLongInterest",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "openShortInterest",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "padding",
                        "type": {
                            "array": [
                                "u64",
                                14
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "ProductMetadata",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u64"
                    },
                    {
                        "name": "productKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "name",
                        "type": {
                            "array": [
                                "u8",
                                16
                            ]
                        }
                    },
                    {
                        "name": "orderbook",
                        "type": "publicKey"
                    },
                    {
                        "name": "tickSize",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "baseDecimals",
                        "type": "u64"
                    },
                    {
                        "name": "priceOffset",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "contractVolume",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "prices",
                        "type": {
                            "defined": "PriceEwma"
                        }
                    }
                ]
            }
        },
        {
            "name": "ProductStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Uninitialized"
                    },
                    {
                        "name": "Initialized"
                    },
                    {
                        "name": "Expired"
                    }
                ]
            }
        },
        {
            "name": "Combo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "metadata",
                        "type": {
                            "defined": "ProductMetadata"
                        }
                    },
                    {
                        "name": "numLegs",
                        "type": "u64"
                    },
                    {
                        "name": "legs",
                        "type": {
                            "array": [
                                {
                                    "defined": "Leg"
                                },
                                4
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "Leg",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "productKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "ratio",
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "HealthInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "health",
                        "type": {
                            "defined": "HealthStatus"
                        }
                    },
                    {
                        "name": "action",
                        "type": {
                            "defined": "ActionStatus"
                        }
                    }
                ]
            }
        },
        {
            "name": "HealthStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Healthy"
                    },
                    {
                        "name": "Unhealthy"
                    },
                    {
                        "name": "Liquidatable"
                    },
                    {
                        "name": "NotLiquidatable"
                    }
                ]
            }
        },
        {
            "name": "ActionStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Approved"
                    },
                    {
                        "name": "NotApproved"
                    }
                ]
            }
        },
        {
            "name": "SocialLoss",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "amount",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "LiquidationInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "health",
                        "type": {
                            "defined": "HealthStatus"
                        }
                    },
                    {
                        "name": "action",
                        "type": {
                            "defined": "ActionStatus"
                        }
                    },
                    {
                        "name": "totalSocialLoss",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "liquidationPrice",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "socialLosses",
                        "type": {
                            "array": [
                                {
                                    "defined": "SocialLoss"
                                },
                                16
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "DexError",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "ContractIsExpired"
                    },
                    {
                        "name": "ContractIsNotExpired"
                    },
                    {
                        "name": "InvalidSystemProgramAccount"
                    },
                    {
                        "name": "InvalidAobProgramAccount"
                    },
                    {
                        "name": "InvalidStateAccountOwner"
                    },
                    {
                        "name": "InvalidOrderIndex"
                    },
                    {
                        "name": "UserAccountFull"
                    },
                    {
                        "name": "TransactionAborted"
                    },
                    {
                        "name": "MissingUserAccount"
                    },
                    {
                        "name": "OrderNotFound"
                    },
                    {
                        "name": "NoOp"
                    },
                    {
                        "name": "OutofFunds"
                    },
                    {
                        "name": "UserAccountStillActive"
                    },
                    {
                        "name": "MarketStillActive"
                    },
                    {
                        "name": "InvalidMarketSignerAccount"
                    },
                    {
                        "name": "InvalidOrderbookAccount"
                    },
                    {
                        "name": "InvalidMarketAdminAccount"
                    },
                    {
                        "name": "InvalidBaseVaultAccount"
                    },
                    {
                        "name": "InvalidQuoteVaultAccount"
                    },
                    {
                        "name": "FullMarketProductGroup"
                    },
                    {
                        "name": "MissingMarketProduct"
                    },
                    {
                        "name": "InvalidWithdrawalAmount"
                    },
                    {
                        "name": "InvalidTakerTrader"
                    },
                    {
                        "name": "FundsError"
                    },
                    {
                        "name": "InactiveProductError"
                    },
                    {
                        "name": "TooManyOpenOrdersError"
                    },
                    {
                        "name": "NoMoreOpenOrdersError"
                    },
                    {
                        "name": "NonZeroPriceTickExponentError"
                    },
                    {
                        "name": "DuplicateProductNameError"
                    },
                    {
                        "name": "InvalidRiskResponseError"
                    },
                    {
                        "name": "InvalidAccountHealthError"
                    },
                    {
                        "name": "OrderbookIsEmptyError"
                    },
                    {
                        "name": "CombosNotRemoved"
                    },
                    {
                        "name": "AccountNotLiquidable"
                    },
                    {
                        "name": "FundingPrecisionError"
                    },
                    {
                        "name": "ProductDecimalPrecisionError"
                    },
                    {
                        "name": "ProductNotOutright"
                    },
                    {
                        "name": "ProductNotCombo"
                    },
                    {
                        "name": "InvalidSocialLossCalculation"
                    },
                    {
                        "name": "ProductIndexMismatch"
                    },
                    {
                        "name": "InvalidOrderID"
                    },
                    {
                        "name": "InvalidBytesForZeroCopyDeserialization"
                    }
                ]
            }
        },
        {
            "name": "OrderInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "totalOrderQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "matchedOrderQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "orderSide",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "isCombo",
                        "type": "bool"
                    },
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "operationType",
                        "type": {
                            "defined": "OperationType"
                        }
                    },
                    {
                        "name": "oldAskQtyInBook",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "oldBidQtyInBook",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "OperationType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "NewOrder"
                    },
                    {
                        "name": "CancelOrder"
                    },
                    {
                        "name": "CheckHealth"
                    },
                    {
                        "name": "PositionTransfer"
                    },
                    {
                        "name": "ConsumeEvents"
                    }
                ]
            }
        },
        {
            "name": "AccountTag",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Uninitialized"
                    },
                    {
                        "name": "MarketProductGroup"
                    },
                    {
                        "name": "TraderRiskGroup"
                    },
                    {
                        "name": "TraderPosition"
                    },
                    {
                        "name": "MarketProductGroupWithCombos"
                    },
                    {
                        "name": "ComboGroup"
                    },
                    {
                        "name": "Combo"
                    },
                    {
                        "name": "RiskProfile"
                    }
                ]
            }
        },
        {
            "name": "TraderPosition",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "tag",
                        "type": {
                            "defined": "AccountTag"
                        }
                    },
                    {
                        "name": "productKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "position",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "pendingPosition",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "productIndex",
                        "type": "u64"
                    },
                    {
                        "name": "lastCumFundingSnapshot",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "lastSocialLossSnapshot",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "Bitset",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "inner",
                        "type": {
                            "array": [
                                "u128",
                                2
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "InitializeMarketProductGroupParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "name",
                        "type": {
                            "array": [
                                "u8",
                                16
                            ]
                        }
                    },
                    {
                        "name": "validateAccountDiscriminantLen",
                        "type": "u64"
                    },
                    {
                        "name": "findFeesDiscriminantLen",
                        "type": "u64"
                    },
                    {
                        "name": "validateAccountHealthDiscriminant",
                        "type": {
                            "array": [
                                "u8",
                                8
                            ]
                        }
                    },
                    {
                        "name": "validateAccountLiquidationDiscriminant",
                        "type": {
                            "array": [
                                "u8",
                                8
                            ]
                        }
                    },
                    {
                        "name": "createRiskStateAccountDiscriminant",
                        "type": {
                            "array": [
                                "u8",
                                8
                            ]
                        }
                    },
                    {
                        "name": "findFeesDiscriminant",
                        "type": {
                            "array": [
                                "u8",
                                8
                            ]
                        }
                    },
                    {
                        "name": "maxMakerFeeBps",
                        "type": "i16"
                    },
                    {
                        "name": "minMakerFeeBps",
                        "type": "i16"
                    },
                    {
                        "name": "maxTakerFeeBps",
                        "type": "i16"
                    },
                    {
                        "name": "minTakerFeeBps",
                        "type": "i16"
                    }
                ]
            }
        },
        {
            "name": "InitializeMarketProductParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "name",
                        "type": {
                            "array": [
                                "u8",
                                16
                            ]
                        }
                    },
                    {
                        "name": "tickSize",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "baseDecimals",
                        "type": "u64"
                    },
                    {
                        "name": "priceOffset",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "OrderType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Limit"
                    },
                    {
                        "name": "ImmediateOrCancel"
                    },
                    {
                        "name": "FillOrKill"
                    },
                    {
                        "name": "PostOnly"
                    }
                ]
            }
        },
        {
            "name": "NewOrderParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "side",
                        "type": {
                            "defined": "Side"
                        }
                    },
                    {
                        "name": "maxBaseQty",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "orderType",
                        "type": {
                            "defined": "OrderType"
                        }
                    },
                    {
                        "name": "selfTradeBehavior",
                        "type": {
                            "defined": "SelfTradeBehavior"
                        }
                    },
                    {
                        "name": "matchLimit",
                        "type": "u64"
                    },
                    {
                        "name": "limitPrice",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "ConsumeOrderbookEventsParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "maxIterations",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "CancelOrderParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "orderId",
                        "type": "u128"
                    }
                ]
            }
        },
        {
            "name": "DepositFundsParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "quantity",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "WithdrawFundsParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "quantity",
                        "type": {
                            "defined": "Fractional"
                        }
                    }
                ]
            }
        },
        {
            "name": "UpdateProductFundingParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "amount",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "expired",
                        "type": "bool"
                    }
                ]
            }
        },
        {
            "name": "InitializeComboParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "name",
                        "type": {
                            "array": [
                                "u8",
                                16
                            ]
                        }
                    },
                    {
                        "name": "tickSize",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "priceOffset",
                        "type": {
                            "defined": "Fractional"
                        }
                    },
                    {
                        "name": "baseDecimals",
                        "type": "u64"
                    },
                    {
                        "name": "ratios",
                        "type": {
                            "vec": "i8"
                        }
                    }
                ]
            }
        },
        {
            "name": "ClearExpiredOrderbookParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "numOrdersToCancel",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "UtilError",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "AccountAlreadyInitialized"
                    },
                    {
                        "name": "AccountUninitialized"
                    },
                    {
                        "name": "DuplicateProductKey"
                    },
                    {
                        "name": "PublicKeyMismatch"
                    },
                    {
                        "name": "AssertionError"
                    },
                    {
                        "name": "InvalidMintAuthority"
                    },
                    {
                        "name": "IncorrectOwner"
                    },
                    {
                        "name": "PublicKeysShouldBeUnique"
                    },
                    {
                        "name": "NotRentExempt"
                    },
                    {
                        "name": "NumericalOverflow"
                    },
                    {
                        "name": "RoundError"
                    },
                    {
                        "name": "DivisionbyZero"
                    },
                    {
                        "name": "InvalidReturnValue"
                    },
                    {
                        "name": "SqrtRootError"
                    },
                    {
                        "name": "ZeroPriceError"
                    },
                    {
                        "name": "ZeroQuantityError"
                    },
                    {
                        "name": "SerializeError"
                    },
                    {
                        "name": "DeserializeError"
                    },
                    {
                        "name": "InvalidBitsetIndex"
                    }
                ]
            }
        }
    ],
    "events": [
        {
            "name": "DexOrderSummary",
            "fields": [
                {
                    "name": "postedOrderId",
                    "type": {
                        "option": "u128"
                    },
                    "index": false
                },
                {
                    "name": "totalBaseQty",
                    "type": "u64",
                    "index": false
                },
                {
                    "name": "totalQuoteQty",
                    "type": "u64",
                    "index": false
                },
                {
                    "name": "totalBaseQtyPosted",
                    "type": "u64",
                    "index": false
                }
            ]
        }
    ]
}