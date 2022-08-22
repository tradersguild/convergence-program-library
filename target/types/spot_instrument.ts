export type SpotInstrument = {
  "version": "0.1.0",
  "name": "spot_instrument",
  "instructions": [
    {
      "name": "validateData",
      "accounts": [
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintAddress",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "prepareToSettle",
      "accounts": [
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "caller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "callerTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "response",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
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
          "name": "legIndex",
          "type": "u8"
        },
        {
          "name": "side",
          "type": {
            "defined": "AuthoritySide"
          }
        }
      ]
    },
    {
      "name": "settle",
      "accounts": [
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfq",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "response",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverTokens",
          "isMut": true,
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
          "name": "legIndex",
          "type": "u8"
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PassedMintDoesNotMatch",
      "msg": "Passed mint account does not match"
    },
    {
      "code": 6001,
      "name": "InvalidReceiver",
      "msg": "Passed account is not an associated token account of a receiver"
    }
  ]
};

export const IDL: SpotInstrument = {
  "version": "0.1.0",
  "name": "spot_instrument",
  "instructions": [
    {
      "name": "validateData",
      "accounts": [
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintAddress",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "prepareToSettle",
      "accounts": [
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "caller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "callerTokens",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rfq",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "response",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
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
          "name": "legIndex",
          "type": "u8"
        },
        {
          "name": "side",
          "type": {
            "defined": "AuthoritySide"
          }
        }
      ]
    },
    {
      "name": "settle",
      "accounts": [
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rfq",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "response",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverTokens",
          "isMut": true,
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
          "name": "legIndex",
          "type": "u8"
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PassedMintDoesNotMatch",
      "msg": "Passed mint account does not match"
    },
    {
      "code": 6001,
      "name": "InvalidReceiver",
      "msg": "Passed account is not an associated token account of a receiver"
    }
  ]
};
