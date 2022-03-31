export type Rfq = {
  "version": "0.1.0",
  "name": "rfq",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
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
          "name": "authority",
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
          "name": "requestOrder",
          "type": {
            "defined": "Order"
          }
        },
        {
          "name": "instrument",
          "type": {
            "defined": "Instrument"
          }
        },
        {
          "name": "expiry",
          "type": "i64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "respond",
      "accounts": [
        {
          "name": "authority",
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
      "name": "confirm",
      "accounts": [
        {
          "name": "authority",
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
          "name": "confirmOrder",
          "type": {
            "defined": "Order"
          }
        }
      ]
    },
    {
      "name": "lastLook",
      "accounts": [
        {
          "name": "authority",
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
      "name": "returnCollateral",
      "accounts": [
        {
          "name": "authority",
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
          "name": "authority",
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
            "name": "confirmOrder",
            "type": {
              "defined": "Order"
            }
          },
          {
            "name": "confirmed",
            "type": "bool"
          },
          {
            "name": "expired",
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
            "name": "instrument",
            "type": {
              "defined": "Instrument"
            }
          },
          {
            "name": "orderAmount",
            "type": "u64"
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
            "name": "requestOrder",
            "type": {
              "defined": "Order"
            }
          },
          {
            "name": "takerAddress",
            "type": "publicKey"
          },
          {
            "name": "timeResponse",
            "type": "i64"
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
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "collateralReturned",
            "type": "bool"
          },
          {
            "name": "id",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
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
      "name": "ProtocolError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InvalidOrder"
          },
          {
            "name": "InvalidQuote"
          },
          {
            "name": "InvalidTakerAddress"
          },
          {
            "name": "InvalidOrderAmount"
          },
          {
            "name": "NotImplemented"
          },
          {
            "name": "TradeNotConfirmed"
          },
          {
            "name": "TradeNotApproved"
          },
          {
            "name": "ResponseTimeElapsed"
          }
        ]
      }
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
          "name": "authority",
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
          "name": "authority",
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
          "name": "requestOrder",
          "type": {
            "defined": "Order"
          }
        },
        {
          "name": "instrument",
          "type": {
            "defined": "Instrument"
          }
        },
        {
          "name": "expiry",
          "type": "i64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "respond",
      "accounts": [
        {
          "name": "authority",
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
      "name": "confirm",
      "accounts": [
        {
          "name": "authority",
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
          "name": "confirmOrder",
          "type": {
            "defined": "Order"
          }
        }
      ]
    },
    {
      "name": "lastLook",
      "accounts": [
        {
          "name": "authority",
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
      "name": "returnCollateral",
      "accounts": [
        {
          "name": "authority",
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
          "name": "authority",
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
            "name": "confirmOrder",
            "type": {
              "defined": "Order"
            }
          },
          {
            "name": "confirmed",
            "type": "bool"
          },
          {
            "name": "expired",
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
            "name": "instrument",
            "type": {
              "defined": "Instrument"
            }
          },
          {
            "name": "orderAmount",
            "type": "u64"
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
            "name": "requestOrder",
            "type": {
              "defined": "Order"
            }
          },
          {
            "name": "takerAddress",
            "type": "publicKey"
          },
          {
            "name": "timeResponse",
            "type": "i64"
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
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "collateralReturned",
            "type": "bool"
          },
          {
            "name": "id",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
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
      "name": "ProtocolError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InvalidOrder"
          },
          {
            "name": "InvalidQuote"
          },
          {
            "name": "InvalidTakerAddress"
          },
          {
            "name": "InvalidOrderAmount"
          },
          {
            "name": "NotImplemented"
          },
          {
            "name": "TradeNotConfirmed"
          },
          {
            "name": "TradeNotApproved"
          },
          {
            "name": "ResponseTimeElapsed"
          }
        ]
      }
    }
  ]
};
