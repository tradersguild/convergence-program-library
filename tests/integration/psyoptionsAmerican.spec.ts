import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { sleep, toAbsolutePrice, TokenChangeMeasurer, toLegMultiplier, withTokenDecimals } from "../utilities/helpers";
import * as anchor from "@project-serum/anchor";
import { Context, getContext } from "../utilities/wrappers";
import { AuthoritySide, Quote, Side, OrderType } from "../utilities/types";
import {
  PsyoptionsAmericanInstrumentClass,
  AmericanPsyoptions,
} from "../utilities/instruments/psyoptionsAmericanInstrument";
import { OptionType } from "@mithraic-labs/tokenized-euros";

describe("Psyoptions American instrument integration tests", async () => {
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

  it("Create buy RFQ for 1 option", async () => {
    const options = await AmericanPsyoptions.initalizeNewPsyoptionsAmerican(context, context.maker);
    await options.mintPsyOPtions(context.maker, new anchor.BN(1), OptionType.CALL, context);

    const tokenMeasurer = await TokenChangeMeasurer.takeSnapshot(
      context,
      ["quote", "asset", options.callMint],
      [context.taker.publicKey, context.maker.publicKey]
    );

    const rfq = await context.createRfq({
      legs: [
        PsyoptionsAmericanInstrumentClass.create(context, options, OptionType.CALL, {
          amount: new BN(1),
          side: Side.Bid,
        }),
      ],
    });

    // Response with agreeing to sell 2 options for 50$ or buy 5 for 45$
    const response = await rfq.respond({
      bid: Quote.getStandard(toAbsolutePrice(withTokenDecimals(45)), toLegMultiplier(5)),
      ask: Quote.getStandard(toAbsolutePrice(withTokenDecimals(50)), toLegMultiplier(2)),
    });

    // Taker confirms to buy 1 option
    await response.confirm({ side: Side.Ask, legMultiplierBps: toLegMultiplier(1) });
    await response.prepareSettlement(AuthoritySide.Taker);
    await response.prepareSettlement(AuthoritySide.Maker);

    // taker should receive 1 option, maker should receive 50$ and lose 1 bitcoin as option collateral
    await response.settle(maker, [taker]);
    await tokenMeasurer.expectChange([
      { token: options.callMint, user: taker, delta: new BN(1) },
      { token: "quote", user: taker, delta: withTokenDecimals(-50) },
      { token: "quote", user: maker, delta: withTokenDecimals(50) },
      { token: "asset", user: maker, delta: withTokenDecimals(0) },
      { token: options.callMint, user: maker, delta: new BN(-1) },
    ]);

    await response.unlockResponseCollateral();
    await response.cleanUp();
  });

  it("Create sell RFQ where taker wants 2 options", async () => {
    const options = await AmericanPsyoptions.initalizeNewPsyoptionsAmerican(context, context.taker);
    await options.mintPsyOPtions(context.taker, new anchor.BN(2), OptionType.CALL, context);
    const tokenMeasurer = await TokenChangeMeasurer.takeSnapshot(
      context,
      ["asset", "quote", options.callMint],
      [taker, maker]
    );

    // Create a two way RFQ specifying 1 option call as a leg
    const rfq = await context.createRfq({
      legs: [
        PsyoptionsAmericanInstrumentClass.create(context, options, OptionType.CALL, {
          amount: new BN(1),
          side: Side.Bid,
        }),
      ],
    });

    // Response with agreeing to buy 2 options for 45$
    const response = await rfq.respond({
      bid: Quote.getStandard(toAbsolutePrice(withTokenDecimals(45)), toLegMultiplier(2)),
    });
    await response.confirm({ side: Side.Bid, legMultiplierBps: toLegMultiplier(2) });

    // taker confirms to sell 2 options

    try {
      await response.prepareSettlement(AuthoritySide.Taker);
    } catch (e) {
      console.error(e);
    }

    try {
      await response.prepareSettlement(AuthoritySide.Maker);
    } catch (e) {
      console.error(e);
    }

    // taker should redceive 90$, maker should receive 2 options
    await response.settle(taker, [maker]);

    await tokenMeasurer.expectChange([
      { token: options.callMint, user: taker, delta: new BN(-2) },
      { token: "quote", user: taker, delta: withTokenDecimals(90) },
      { token: "quote", user: maker, delta: withTokenDecimals(-90) },
      { token: "asset", user: maker, delta: withTokenDecimals(0) },
      { token: options.callMint, user: maker, delta: new BN(2) },
    ]);

    await response.unlockResponseCollateral();
    await response.cleanUp();
  });

  it("Create two-way RFQ with one Psyoptions American option leg, respond but maker defaults on settlement", async () => {
    // Create a two way RFQ specifying 1 option put as a leg
    const options = await AmericanPsyoptions.initalizeNewPsyoptionsAmerican(context, context.taker);
    await options.mintPsyOPtions(context.taker, new anchor.BN(2), OptionType.CALL, context);

    const rfq = await context.createRfq({
      activeWindow: 2,
      settlingWindow: 1,
      legs: [
        PsyoptionsAmericanInstrumentClass.create(context, options, OptionType.CALL, {
          amount: new BN(1),
          side: Side.Bid,
        }),
      ],
      orderType: OrderType.TwoWay,
    });

    // response with agreeing to buy 5 options for 45$
    const response = await rfq.respond({
      bid: Quote.getStandard(toAbsolutePrice(withTokenDecimals(45)), toLegMultiplier(5)),
    });

    // taker confirms to sell 2 options
    await response.confirm({ side: Side.Bid, legMultiplierBps: toLegMultiplier(2) });
    const tokenMeasurer = await TokenChangeMeasurer.takeSnapshot(context, [options.callMint], [taker]);

    await response.prepareSettlement(AuthoritySide.Taker);
    await sleep(3000);
    await response.revertSettlementPreparation(AuthoritySide.Taker);

    // taker have returned his assets
    await tokenMeasurer.expectChange([{ token: options.callMint, user: taker, delta: new BN(0) }]);

    await response.settleOnePartyDefault();
    await response.cleanUp();
    await rfq.cleanUp();
  });

  it("Create two-way RFQ with one Psyoptions American option leg, respond but taker defaults on settlement", async () => {
    // create a two way RFQ specifying 1 option put as a leg
    const options = await AmericanPsyoptions.initalizeNewPsyoptionsAmerican(context, context.taker);
    await options.mintPsyOPtions(context.taker, new anchor.BN(2), OptionType.CALL, context);
    const rfq = await context.createRfq({
      activeWindow: 2,
      settlingWindow: 1,
      legs: [
        PsyoptionsAmericanInstrumentClass.create(context, options, OptionType.CALL, {
          amount: new BN(1),
          side: Side.Bid,
        }),
      ],
      orderType: OrderType.TwoWay,
    });

    // response with agreeing to buy 5 options for 45$
    const response = await rfq.respond({
      bid: Quote.getStandard(toAbsolutePrice(withTokenDecimals(45)), toLegMultiplier(5)),
    });

    // taker confirms to sell 2 options
    await response.confirm({ side: Side.Bid, legMultiplierBps: toLegMultiplier(2) });
    const tokenMeasurer = await TokenChangeMeasurer.takeSnapshot(context, ["quote"], [maker]);
    await response.prepareSettlement(AuthoritySide.Maker);
    await tokenMeasurer.expectChange([{ token: "quote", user: maker, delta: withTokenDecimals(new BN(-90)) }]);
    await sleep(3000);
    await response.revertSettlementPreparation(AuthoritySide.Maker);

    // taker have returned his assets
    await response.settleOnePartyDefault();
    await tokenMeasurer.expectChange([{ token: "quote", user: maker, delta: new BN(0) }]);
    await response.cleanUp();
    await rfq.cleanUp();
  });
});
