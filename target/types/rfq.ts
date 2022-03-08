export type Rfq = {
  "version": "0.1.0",
  "name": "rfq",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
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
      "name": "initializeRfq",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
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
          "name": "rfqState",
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
          "name": "associatedTokenProgram",
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
          "name": "title",
          "type": "string"
        },
        {
          "name": "takerOrderType",
          "type": "u8"
        },
        {
          "name": "instrument",
          "type": "u8"
        },
        {
          "name": "expiry",
          "type": "i64"
        },
        {
          "name": "ratio",
          "type": "u8"
        },
        {
          "name": "nOfLegs",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "respondRfq",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAssetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowQuoteToken",
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
          "name": "associatedTokenProgram",
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
          "name": "title",
          "type": "string"
        },
        {
          "name": "orderType",
          "type": "u8"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
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
          "name": "rfqState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAssetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowQuoteToken",
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
          "name": "associatedTokenProgram",
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
          "name": "title",
          "type": "string"
        },
        {
          "name": "orderType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "counter",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAssetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowQuoteToken",
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
          "name": "associatedTokenProgram",
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
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAssetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowQuoteToken",
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
          "name": "associatedTokenProgram",
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
    }
  ],
  "accounts": [
    {
      "name": "rfqState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "action",
            "type": "bool"
          },
          {
            "name": "instrument",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "expired",
            "type": "bool"
          },
          {
            "name": "ratio",
            "type": "u8"
          },
          {
            "name": "nOfLegs",
            "type": "u8"
          },
          {
            "name": "assetMint",
            "type": "publicKey"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "bestBid",
            "type": "u64"
          },
          {
            "name": "bestAsk",
            "type": "u64"
          },
          {
            "name": "bestBidAddress",
            "type": "publicKey"
          },
          {
            "name": "bestAskAddress",
            "type": "publicKey"
          },
          {
            "name": "orderCount",
            "type": "u16"
          },
          {
            "name": "takerOrderType",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "confirmed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "globalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rfqCount",
            "type": "u64"
          },
          {
            "name": "accessManagerCount",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "feeDenominator",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidQuoteType",
      "msg": "Invalid quote type"
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
          "isMut": false,
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
      "name": "initializeRfq",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
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
          "name": "rfqState",
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
          "name": "associatedTokenProgram",
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
          "name": "title",
          "type": "string"
        },
        {
          "name": "takerOrderType",
          "type": "u8"
        },
        {
          "name": "instrument",
          "type": "u8"
        },
        {
          "name": "expiry",
          "type": "i64"
        },
        {
          "name": "ratio",
          "type": "u8"
        },
        {
          "name": "nOfLegs",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "respondRfq",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAssetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowQuoteToken",
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
          "name": "associatedTokenProgram",
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
          "name": "title",
          "type": "string"
        },
        {
          "name": "orderType",
          "type": "u8"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
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
          "name": "rfqState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAssetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowQuoteToken",
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
          "name": "associatedTokenProgram",
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
          "name": "title",
          "type": "string"
        },
        {
          "name": "orderType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "counter",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAssetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowQuoteToken",
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
          "name": "associatedTokenProgram",
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
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rfqState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "assetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAssetToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowQuoteToken",
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
          "name": "associatedTokenProgram",
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
    }
  ],
  "accounts": [
    {
      "name": "rfqState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "action",
            "type": "bool"
          },
          {
            "name": "instrument",
            "type": "u8"
          },
          {
            "name": "expiry",
            "type": "i64"
          },
          {
            "name": "expired",
            "type": "bool"
          },
          {
            "name": "ratio",
            "type": "u8"
          },
          {
            "name": "nOfLegs",
            "type": "u8"
          },
          {
            "name": "assetMint",
            "type": "publicKey"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "bestBid",
            "type": "u64"
          },
          {
            "name": "bestAsk",
            "type": "u64"
          },
          {
            "name": "bestBidAddress",
            "type": "publicKey"
          },
          {
            "name": "bestAskAddress",
            "type": "publicKey"
          },
          {
            "name": "orderCount",
            "type": "u16"
          },
          {
            "name": "takerOrderType",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "confirmed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "globalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rfqCount",
            "type": "u64"
          },
          {
            "name": "accessManagerCount",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "feeDenominator",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidQuoteType",
      "msg": "Invalid quote type"
    }
  ]
};
