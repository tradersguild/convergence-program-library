import { BN } from "@project-serum/anchor";
import { AccountMeta, PublicKey } from "@solana/web3.js";
import { AssetIdentifier } from "./types";
import { Response, Rfq } from "./wrappers";

export interface InstrumentData {
  instrument: PublicKey;
  instrumentData: Buffer | Uint8Array;
  instrumentAmount: BN;
  side: { bid: {} } | { ask: {} };
}

export interface Instrument {
  serializeInstrumentData(): Buffer;
  serializeInstrumentDataForQuote(): Buffer;
  getProgramId(): PublicKey;
  getValidationAccounts(): Promise<AccountMeta[]>;
  getPrepareSettlementAccounts(
    side: { taker: {} } | { maker: {} },
    assetIdentifier: AssetIdentifier,
    rfq: Rfq,
    response: Response
  ): Promise<AccountMeta[]>;
  getSettleAccounts(
    assetReceiver: PublicKey,
    assetIdentifier: AssetIdentifier,
    rfq: Rfq,
    response: Response
  ): Promise<AccountMeta[]>;
  getRevertSettlementPreparationAccounts(
    side: { taker: {} } | { maker: {} },
    assetIdentifier: AssetIdentifier,
    rfq: Rfq,
    response: Response
  ): Promise<AccountMeta[]>;
  getCleanUpAccounts(assetIdentifier: AssetIdentifier, rfq: Rfq, response: Response): Promise<AccountMeta[]>;
}

export class InstrumentController {
  constructor(
    protected instrument: Instrument,
    protected legInfo: { amount: BN; side: { bid: {} } | { ask: {} }; baseAssetIndex: number } | null,
    protected decimals: number
  ) {}

  getBaseAssetIndex() {
    if (this.legInfo === null) {
      throw Error("Instrument is used for quote!");
    }

    return this.legInfo.baseAssetIndex;
  }

  toLegData() {
    if (this.legInfo === null) {
      throw Error("Instrument is used for quote!");
    }

    return {
      instrumentProgram: this.instrument.getProgramId(),
      baseAssetIndex: { value: this.legInfo.baseAssetIndex },
      instrumentData: this.instrument.serializeInstrumentData(),
      instrumentAmount: new BN(this.legInfo.amount),
      instrumentDecimals: this.decimals,
      side: this.legInfo.side,
    };
  }

  toQuoteData() {
    if (this.legInfo !== null) {
      throw Error("Instrument is used for leg!");
    }

    return {
      instrumentProgram: this.instrument.getProgramId(),
      instrumentData: this.instrument.serializeInstrumentDataForQuote(),
      instrumentDecimals: this.decimals,
    };
  }

  getInstrumendDataSize() {
    return this.instrument.serializeInstrumentData().length;
  }

  private getProgramAccount() {
    return { pubkey: this.instrument.getProgramId(), isSigner: false, isWritable: false };
  }

  async getValidationAccounts() {
    return [this.getProgramAccount()].concat(await this.instrument.getValidationAccounts());
  }

  async getPrepareSettlementAccounts(
    side: { taker: {} } | { maker: {} },
    assetIdentifier: AssetIdentifier,
    rfq: Rfq,
    response: Response
  ) {
    return [this.getProgramAccount()].concat(
      await this.instrument.getPrepareSettlementAccounts(side, assetIdentifier, rfq, response)
    );
  }

  async getSettleAccounts(assetReceiver: PublicKey, assetIdentifier: AssetIdentifier, rfq: Rfq, response: Response) {
    return [this.getProgramAccount()].concat(
      await this.instrument.getSettleAccounts(assetReceiver, assetIdentifier, rfq, response)
    );
  }

  async getRevertSettlementPreparationAccounts(
    side: { taker: {} } | { maker: {} },
    assetIdentifier: AssetIdentifier,
    rfq: Rfq,
    response: Response
  ) {
    return [this.getProgramAccount()].concat(
      await this.instrument.getRevertSettlementPreparationAccounts(side, assetIdentifier, rfq, response)
    );
  }

  async getCleanUpAccounts(assetIdentifier: AssetIdentifier, rfq: Rfq, response: Response) {
    return [this.getProgramAccount()].concat(await this.instrument.getCleanUpAccounts(assetIdentifier, rfq, response));
  }
}
