export type Rfq = {
  "version": "0.1.0",
  "name": "rfq",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
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
          "name": "feeDenominator",
          "type": "u64"
        },
        {
          "name": "feeNumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setFee",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeDenominator",
          "type": "u64"
        },
        {
          "name": "feeNumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "request",
      "accounts": [
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "expiry",
          "type": "i64"
        },
        {
          "name": "lastLook",
          "type": "bool"
        },
        {
          "name": "legs",
          "type": {
            "vec": {
              "defined": "Leg"
            }
          }
        },
        {
          "name": "orderAmount",
          "type": "u64"
        },
        {
          "name": "orderType",
          "type": {
            "defined": "Order"
          }
        }
      ]
    },
    {
      "name": "respond",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bid",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "ask",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "lastLook",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "confirm",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quote",
          "type": {
            "defined": "Quote"
          }
        }
      ]
    },
    {
      "name": "returnCollateral",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "settle",
      "accounts": [
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryWallet",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "rfqState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "approved",
            "type": "bool"
          },
          {
            "name": "assetEscrowBump",
            "type": "u8"
          },
          {
            "name": "assetMint",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bestAskAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bestBidAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bestAskAddress",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "bestBidAddress",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "confirmed",
            "type": "bool"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "legs",
            "type": {
              "vec": {
                "defined": "Leg"
              }
            }
          },
          {
            "name": "lastLook",
            "type": "bool"
          },
          {
            "name": "orderAmount",
            "type": "u64"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "Order"
            }
          },
          {
            "name": "quoteEscrowBump",
            "type": "u8"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "responseCount",
            "type": "u64"
          },
          {
            "name": "settled",
            "type": "bool"
          },
          {
            "name": "unixTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "protocolState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accessManagerCount",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "feeDenominator",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          },
          {
            "name": "rfqCount",
            "type": "u64"
          },
          {
            "name": "treasuryWallet",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "orderState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ask",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "askConfirmed",
            "type": "bool"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bid",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bidConfirmed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "collateralReturned",
            "type": "bool"
          },
          {
            "name": "confirmedQuote",
            "type": {
              "option": {
                "defined": "Quote"
              }
            }
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "rfq",
            "type": "publicKey"
          },
          {
            "name": "settled",
            "type": "bool"
          },
          {
            "name": "unixTimestamp",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Leg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instrument",
            "type": {
              "defined": "Instrument"
            }
          },
          {
            "name": "venue",
            "type": {
              "defined": "Venue"
            }
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Instrument",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Call"
          },
          {
            "name": "Future"
          },
          {
            "name": "Put"
          },
          {
            "name": "Spot"
          }
        ]
      }
    },
    {
      "name": "Venue",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Convergence"
          },
          {
            "name": "PsyOptions"
          },
          {
            "name": "Sollar"
          }
        ]
      }
    },
    {
      "name": "Quote",
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
      "name": "Order",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          },
          {
            "name": "TwoWay"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "CollateralReturned",
      "msg": "Collateral returned"
    },
    {
      "code": 6001,
      "name": "InvalidConfirm",
      "msg": "Invalid confirm"
    },
    {
      "code": 6002,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6003,
      "name": "InvalidQuote",
      "msg": "Invalid quote"
    },
    {
      "code": 6004,
      "name": "InvalidRfq",
      "msg": "Invalid RFQ"
    },
    {
      "code": 6005,
      "name": "InvalidTaker",
      "msg": "Invalid taker"
    },
    {
      "code": 6006,
      "name": "InvalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6007,
      "name": "InvalidRequest",
      "msg": "Invalid request"
    },
    {
      "code": 6008,
      "name": "LastLookNotSet",
      "msg": "Last look not set"
    },
    {
      "code": 6009,
      "name": "Math",
      "msg": "Math"
    },
    {
      "code": 6010,
      "name": "OrderConfirmed",
      "msg": "Order confirmed"
    },
    {
      "code": 6011,
      "name": "OrderNotApproved",
      "msg": "Order not approved via last look"
    },
    {
      "code": 6012,
      "name": "OrderSettled",
      "msg": "Order settled"
    },
    {
      "code": 6013,
      "name": "RfqConfirmed",
      "msg": "RFQ confirmed"
    },
    {
      "code": 6014,
      "name": "RfqActiveOrUnconfirmed",
      "msg": "RFQ active or unconfirmed"
    },
    {
      "code": 6015,
      "name": "RfqInactiveOrConfirmed",
      "msg": "RFQ inactive or confirmed"
    },
    {
      "code": 6016,
      "name": "RfqSettled",
      "msg": "RFQ settled"
    }
  ]
};

export const IDL: Rfq = {
  "version": "0.1.0",
  "name": "rfq",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
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
          "name": "feeDenominator",
          "type": "u64"
        },
        {
          "name": "feeNumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setFee",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeDenominator",
          "type": "u64"
        },
        {
          "name": "feeNumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "request",
      "accounts": [
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "expiry",
          "type": "i64"
        },
        {
          "name": "lastLook",
          "type": "bool"
        },
        {
          "name": "legs",
          "type": {
            "vec": {
              "defined": "Leg"
            }
          }
        },
        {
          "name": "orderAmount",
          "type": "u64"
        },
        {
          "name": "orderType",
          "type": {
            "defined": "Order"
          }
        }
      ]
    },
    {
      "name": "respond",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bid",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "ask",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "lastLook",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "confirm",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quote",
          "type": {
            "defined": "Quote"
          }
        }
      ]
    },
    {
      "name": "returnCollateral",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "settle",
      "accounts": [
        {
          "name": "assetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "assetWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "assetEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryWallet",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "rfqState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "approved",
            "type": "bool"
          },
          {
            "name": "assetEscrowBump",
            "type": "u8"
          },
          {
            "name": "assetMint",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bestAskAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bestBidAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bestAskAddress",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "bestBidAddress",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "confirmed",
            "type": "bool"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "legs",
            "type": {
              "vec": {
                "defined": "Leg"
              }
            }
          },
          {
            "name": "lastLook",
            "type": "bool"
          },
          {
            "name": "orderAmount",
            "type": "u64"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "Order"
            }
          },
          {
            "name": "quoteEscrowBump",
            "type": "u8"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "responseCount",
            "type": "u64"
          },
          {
            "name": "settled",
            "type": "bool"
          },
          {
            "name": "unixTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "protocolState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accessManagerCount",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "feeDenominator",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          },
          {
            "name": "rfqCount",
            "type": "u64"
          },
          {
            "name": "treasuryWallet",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "orderState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ask",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "askConfirmed",
            "type": "bool"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bid",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bidConfirmed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "collateralReturned",
            "type": "bool"
          },
          {
            "name": "confirmedQuote",
            "type": {
              "option": {
                "defined": "Quote"
              }
            }
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "rfq",
            "type": "publicKey"
          },
          {
            "name": "settled",
            "type": "bool"
          },
          {
            "name": "unixTimestamp",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Leg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instrument",
            "type": {
              "defined": "Instrument"
            }
          },
          {
            "name": "venue",
            "type": {
              "defined": "Venue"
            }
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Instrument",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Call"
          },
          {
            "name": "Future"
          },
          {
            "name": "Put"
          },
          {
            "name": "Spot"
          }
        ]
      }
    },
    {
      "name": "Venue",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Convergence"
          },
          {
            "name": "PsyOptions"
          },
          {
            "name": "Sollar"
          }
        ]
      }
    },
    {
      "name": "Quote",
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
      "name": "Order",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          },
          {
            "name": "TwoWay"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "CollateralReturned",
      "msg": "Collateral returned"
    },
    {
      "code": 6001,
      "name": "InvalidConfirm",
      "msg": "Invalid confirm"
    },
    {
      "code": 6002,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6003,
      "name": "InvalidQuote",
      "msg": "Invalid quote"
    },
    {
      "code": 6004,
      "name": "InvalidRfq",
      "msg": "Invalid RFQ"
    },
    {
      "code": 6005,
      "name": "InvalidTaker",
      "msg": "Invalid taker"
    },
    {
      "code": 6006,
      "name": "InvalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6007,
      "name": "InvalidRequest",
      "msg": "Invalid request"
    },
    {
      "code": 6008,
      "name": "LastLookNotSet",
      "msg": "Last look not set"
    },
    {
      "code": 6009,
      "name": "Math",
      "msg": "Math"
    },
    {
      "code": 6010,
      "name": "OrderConfirmed",
      "msg": "Order confirmed"
    },
    {
      "code": 6011,
      "name": "OrderNotApproved",
      "msg": "Order not approved via last look"
    },
    {
      "code": 6012,
      "name": "OrderSettled",
      "msg": "Order settled"
    },
    {
      "code": 6013,
      "name": "RfqConfirmed",
      "msg": "RFQ confirmed"
    },
    {
      "code": 6014,
      "name": "RfqActiveOrUnconfirmed",
      "msg": "RFQ active or unconfirmed"
    },
    {
      "code": 6015,
      "name": "RfqInactiveOrConfirmed",
      "msg": "RFQ inactive or confirmed"
    },
    {
      "code": 6016,
      "name": "RfqSettled",
      "msg": "RFQ settled"
    }
  ]
};
