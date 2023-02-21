import { PublicKey } from "@solana/web3.js";
import { DEFAULT_DEFAULT_FEES } from "../utilities/constants";
import {
  calculateFeesValue,
  runInParallelWithWait,
  toAbsolutePrice,
  TokenChangeMeasurer,
  toLegMultiplier,
  withTokenDecimals,
} from "../utilities/helpers";
import { SpotInstrument } from "../utilities/instruments/spotInstrument";

import { AuthoritySide, Quote, Side } from "../utilities/types";
import { Context, getContext } from "../utilities/wrappers";

describe("Settle one party default", () => {
  let context: Context;
  let taker: PublicKey;
  let maker: PublicKey;
  let dao: PublicKey;

  before(async () => {
    context = await getContext();
    taker = context.taker.publicKey;
    maker = context.maker.publicKey;
    dao = context.dao.publicKey;
  });

  it("Taker defaulting transfers the correct amount of fees", async () => {
    let tokenMeasurer = await TokenChangeMeasurer.takeSnapshot(context, ["unlockedCollateral"], [taker, maker, dao]);
    const rfq = await context.createRfq({
      legs: [SpotInstrument.createForLeg(context, { amount: withTokenDecimals(1), side: Side.Bid })],
      activeWindow: 2,
      settlingWindow: 1,
    });

    const [response, takerCollateralLocked, makerCollateralLocked] = await runInParallelWithWait(async () => {
      const response = await rfq.respond({
        bid: Quote.getStandard(toAbsolutePrice(withTokenDecimals(22_000)), toLegMultiplier(5)),
      });

      await response.confirm({ side: Side.Bid, legMultiplierBps: toLegMultiplier(1) });
      await response.prepareSettlement(AuthoritySide.Maker);
      const responseState = await response.getData();

      return [response, responseState.takerCollateralLocked, responseState.makerCollateralLocked];
    }, 3.5);

    await response.settleOnePartyDefault();
    const totalFees = calculateFeesValue(takerCollateralLocked, DEFAULT_DEFAULT_FEES.taker).add(
      calculateFeesValue(makerCollateralLocked, DEFAULT_DEFAULT_FEES.maker)
    );

    await tokenMeasurer.expectChange([
      { token: "unlockedCollateral", user: taker, delta: takerCollateralLocked.neg() },
      { token: "unlockedCollateral", user: maker, delta: takerCollateralLocked.sub(totalFees) },
      { token: "unlockedCollateral", user: dao, delta: totalFees },
    ]);
  });

  it("Maker defaulting transfers the correct amount of fees", async () => {
    let tokenMeasurer = await TokenChangeMeasurer.takeSnapshot(context, ["unlockedCollateral"], [taker, maker, dao]);
    const rfq = await context.createRfq({
      legs: [
        SpotInstrument.createForLeg(context, {
          mint: context.additionalAssetToken,
          amount: withTokenDecimals(1),
          side: Side.Bid,
        }),
      ],
      activeWindow: 2,
      settlingWindow: 1,
    });

    const [response, takerCollateralLocked, makerCollateralLocked] = await runInParallelWithWait(async () => {
      const response = await rfq.respond({
        ask: Quote.getStandard(toAbsolutePrice(withTokenDecimals(30)), toLegMultiplier(1000)),
      });

      await response.confirm({ side: Side.Ask, legMultiplierBps: toLegMultiplier(500) });
      await response.prepareSettlement(AuthoritySide.Taker);
      const responseState = await response.getData();

      return [response, responseState.takerCollateralLocked, responseState.makerCollateralLocked];
    }, 3.5);

    await response.settleOnePartyDefault();
    const totalFees = calculateFeesValue(takerCollateralLocked, DEFAULT_DEFAULT_FEES.taker).add(
      calculateFeesValue(makerCollateralLocked, DEFAULT_DEFAULT_FEES.maker)
    );

    await tokenMeasurer.expectChange([
      { token: "unlockedCollateral", user: taker, delta: makerCollateralLocked.sub(totalFees) },
      { token: "unlockedCollateral", user: maker, delta: makerCollateralLocked.neg() },
      { token: "unlockedCollateral", user: dao, delta: totalFees },
    ]);
  });
});
