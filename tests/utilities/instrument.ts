import { BN } from "@project-serum/anchor";
import { AccountMeta, PublicKey } from "@solana/web3.js";
import { getBaseAssetPda } from "./pdas";
import { AssetIdentifier, LegSide } from "./types";
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
  getInstrumentIndex(): number;
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
    protected legInfo: { amount: BN; side: LegSide; baseAssetIndex: number } | null,
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
      settlementTypeMetadata: { instrument: { instrumentIndex: this.instrument.getInstrumentIndex() } },
      baseAssetIndex: { value: this.legInfo.baseAssetIndex },
      data: this.instrument.serializeInstrumentData(),
      amount: new BN(this.legInfo.amount),
      amountDecimals: this.decimals,
      side: this.legInfo.side,
    };
  }

  toQuoteData() {
    if (this.legInfo !== null) {
      throw Error("Instrument is used for leg!");
    }

    return {
      settlementTypeMetadata: { instrument: { instrumentIndex: this.instrument.getInstrumentIndex() } },
      data: this.instrument.serializeInstrumentDataForQuote(),
      decimals: this.decimals,
    };
  }

  getInstrumendDataSize() {
    return this.instrument.serializeInstrumentData().length;
  }

  private getProgramAccount() {
    return { pubkey: this.instrument.getProgramId(), isSigner: false, isWritable: false };
  }

  async getBaseAssetAccount(rfqProgramAddress: PublicKey) {
    const baseAssetAddress = await getBaseAssetPda(this.getBaseAssetIndex(), rfqProgramAddress);
    return { pubkey: baseAssetAddress, isSigner: false, isWritable: false };
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
