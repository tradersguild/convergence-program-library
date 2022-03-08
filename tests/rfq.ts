import * as anchor from '@project-serum/anchor';
import { Program, Provider } from '@project-serum/anchor';
import { Rfq } from '../target/types/rfq';
import * as assert from 'assert';
import * as spl from "@solana/spl-token";
import * as idl from '../target/idl/rfq.json';
import { Token } from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  Signer,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';

let assetMint : spl.Token;
let quoteMint : spl.Token;
let mintAuthority : any;
let authorityAssetToken : any;
let authorityQuoteToken : any;

// Configure the client to use the local cluster.
anchor.setProvider(anchor.Provider.env());
const provider = anchor.getProvider();
const program = anchor.workspace.Rfq as Program<Rfq>;

describe('rfq', () => {
  before(async () => {
    mintAuthority = anchor.web3.Keypair.generate();
    await requestAirdrop(provider, mintAuthority.publicKey, 10_000_000_000);
      
    const walletBalance = await provider.connection.getBalance(provider.wallet.publicKey);
    console.log('main wallet balance: ', walletBalance);
    const mintAuthorityBalance = await provider.connection.getBalance(mintAuthority.publicKey);
    console.log('mint wallet balance: ', mintAuthorityBalance);

    assetMint = await spl.Token.createMint(program.provider.connection,
      mintAuthority,
      mintAuthority.publicKey,
      mintAuthority.publicKey,
      0,
      spl.TOKEN_PROGRAM_ID);

    quoteMint = await spl.Token.createMint(program.provider.connection,
      mintAuthority,
      mintAuthority.publicKey,
      mintAuthority.publicKey,
      0,
      spl.TOKEN_PROGRAM_ID)

    authorityAssetToken = await assetMint.createAssociatedTokenAccount(
      provider.wallet.publicKey,
    );
    authorityQuoteToken = await quoteMint.createAssociatedTokenAccount(
      provider.wallet.publicKey,
    );

    await assetMint.mintTo(authorityAssetToken, mintAuthority.publicKey, [], 10_000_000_000);
    await quoteMint.mintTo(authorityQuoteToken, mintAuthority.publicKey, [], 10_000_000_000);
  });

  it('Initializes', async () => {
    const feeDenominator = 1_000;
    const feeNumerator = 3;
    const { tx, state } = await initializeProtocol(provider, feeDenominator, feeNumerator);
    assert.ok(state.rfqCount.eq(new anchor.BN(0)));
  });

  it('Initializes new RFQ', async () => {  
    const title = "test rfq";
    const takerOrderType = 1; // buy
    const instrument = 1;
    const expiry = new anchor.BN(10_000);
    const ratio = 1;
    const nOfLegs = 1;
    const amount = new anchor.BN(10_000);

    const {tx, state} = await initializeRfq(provider, title, takerOrderType, instrument, expiry, ratio, nOfLegs, amount);
    assert.equal(state.expired, false);
    assert.equal(state.ratio, ratio);
    assert.equal(state.takerOrderType, takerOrderType);
    assert.equal(state.instrument, instrument);
    assert.equal(state.expiry.toString(), expiry.toString());
    assert.equal(state.nOfLegs, nOfLegs);
  });

  // TODO: change wallets
  it('Responds to RFQ', async() => {
    const title = "test rfq";
    const orderType = 1;
    const price = new anchor.BN(100);
    const price2 = new anchor.BN(110);
    const amount = new anchor.BN(10_000);

    const state = await respondRfq(provider, title, orderType, price, amount);
    assert.equal(state.orderCount, 1);
    assert.equal(state.bestBid.toString(), price.toString());
    assert.equal(state.bestAsk.toString(), (new anchor.BN(0).toString()));

    const state2 = await respondRfq(provider, title, orderType, price2, amount);
    assert.equal(state2.orderCount, 2);
    assert.equal(state2.bestBid.toString(), price2.toString());
    assert.equal(state2.bestAsk.toString(), (new anchor.BN(0).toString()));
  })

  it('Taker confirms RFQ price (pre-settlement)', async() => {
    const title = "test rfq";
    const orderType = 2;

    const state = await confirm(provider, title, orderType);

    const assetMintBalance = await getBalance(provider.wallet, assetMint.publicKey);
    const quoteMintBalance = await getBalance(provider.wallet, quoteMint.publicKey);
    console.log('asset mint balance: ', assetMintBalance);
    console.log('quote mint balance: ', quoteMintBalance);
    assert.equal(assetMintBalance, 9999999910);
    assert.equal(state.orderCount, 2);
  })

  /*
  it('place limit orders', async () => {
    const action = true; // buy
    const price = new anchor.BN(1000);
    const price2 = new anchor.BN(200);
    const amount = new anchor.BN(10);
    const title = "test rfq";
    //const { _assetToken, assetMint } = await getNewTokenAndMint(program, provider.wallet);
    //const balanceBeforeCancel = await getBalance(provider.wallet, assetMint.publicKey);
    const state = await placeLimitOrder(provider, title, true, price, amount, assetMint, authorityAssetToken);
    
    assert.equal(state.bids[0].toString(), price.toString());
    const state2 = await placeLimitOrder(provider, title, true, price2, amount, assetMint, authorityAssetToken);
    assert.equal(state2.bids[0].toString(), price2.toString());
    assert.equal(state2.bids[1].toString(), price.toString());
    
    const balanceAfterCancel = await getBalance(provider.wallet, assetMint.publicKey);
    console.log('balance before cancel: ', balanceBeforeCancel);
    console.log('balance after cancel: ', balanceAfterCancel);
    assert.equal(balanceAfterCancel, 9_999_999_980)
  });
  */
  
});


export async function confirm(
  provider: Provider,
  title: string,
  orderType: number,
): Promise<any> {

  const program = await getProgram(provider);

  const [rfqPDA, _rfqBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("rfq_state"), provider.wallet.publicKey.toBytes(), Buffer.from(title.slice(0, 32))],
    program.programId
  );
  const [escrowAssetTokenPDA, _escrowAssetTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("escrow_asset"), provider.wallet.publicKey.toBytes(), Buffer.from(title.slice(0, 32))],
    program.programId
  );
  const [escrowQuoteTokenPDA, _escrowQuoteTokenPDA] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("escrow_quote"), provider.wallet.publicKey.toBytes(), Buffer.from(title.slice(0, 32))],
    program.programId
  );
  
  const tx = await program.rpc.confirm(
    title,
    orderType,
  {
    accounts: {
      authority: provider.wallet.publicKey,
      rfqState: rfqPDA,
      assetToken: authorityAssetToken,
      quoteToken: authorityQuoteToken,
      escrowAssetToken: escrowAssetTokenPDA,
      escrowQuoteToken: escrowQuoteTokenPDA,
      assetMint: assetMint.publicKey,
      quoteMint: quoteMint.publicKey,
      
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    },
  });

  const state = await program.account.rfqState.fetch(rfqPDA);
  return state;
}


export async function respondRfq(
  provider: Provider,
  title: string,
  orderType: number,
  price: anchor.BN,
  amount: anchor.BN,
): Promise<any> {

  const program = await getProgram(provider);

  const [rfqPDA, _rfqBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("rfq_state"), provider.wallet.publicKey.toBytes(), Buffer.from(title.slice(0, 32))],
    program.programId
  );
  const [escrowAssetTokenPDA, _escrowAssetTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("escrow_asset"), provider.wallet.publicKey.toBytes(), Buffer.from(title.slice(0, 32))],
    program.programId
  );
  const [escrowQuoteTokenPDA, _escrowQuoteTokenPDA] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("escrow_quote"), provider.wallet.publicKey.toBytes(), Buffer.from(title.slice(0, 32))],
    program.programId
  );
  
  const tx = await program.rpc.respondRfq(
    title,
    orderType,
    price,
    amount,
  {
    accounts: {
      authority: provider.wallet.publicKey,
      rfqState: rfqPDA,
      assetToken: authorityAssetToken,
      quoteToken: authorityQuoteToken,
      escrowAssetToken: escrowAssetTokenPDA,
      escrowQuoteToken: escrowQuoteTokenPDA,
      assetMint: assetMint.publicKey,
      quoteMint: quoteMint.publicKey,
      
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    },
  });

  const state = await program.account.rfqState.fetch(rfqPDA);
  return state;
}


export async function initializeRfq(
  provider: Provider,
  title: string,
  takeOrderType: number,
  instrument: number,
  expiry: anchor.BN,
  ratio: number,
  nOfLegs: number,
  amount: anchor.BN
): Promise<any> {

  const program = await getProgram(provider);
  console.log("program", program.programId);
  
  const [orderBookPDA, _orderBookBump] = await getPda(provider, 'order_book_state');
  const [rfqPDA, _rfqBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("rfq_state"), provider.wallet.publicKey.toBytes(), Buffer.from(title.slice(0, 32))],
    program.programId
  );

  const tx = await program.rpc.initializeRfq(
    title,
    takeOrderType,
    instrument,
    expiry,
    ratio,
    nOfLegs,
    amount,
  {
    accounts: {
      authority: provider.wallet.publicKey,
      assetMint: assetMint.publicKey,
      quoteMint: quoteMint.publicKey,
      rfqState: rfqPDA,
      
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    },
  });

  const state = await program.account.rfqState.fetch(rfqPDA);
  return { tx, state };
}

export async function initializeProtocol(
  provider: Provider,
  feeDenominator: number,
  feeNumerator: number
): Promise<any> {

  const program = await getProgram(provider);
  console.log("program", program.programId);
  const [protocolPda, _protocolBump] = await getPda(provider, 'convergence_rfq');
  const tx = await program.rpc.initialize(new anchor.BN(feeDenominator), new anchor.BN(feeNumerator), {
    accounts: {
      authority: provider.wallet.publicKey,
      protocol: protocolPda,
      systemProgram: anchor.web3.SystemProgram.programId
    }
  });
  const state = await program.account.globalState.fetch(protocolPda)
  return { tx, state };
}

export async function getPda(provider: any, seed: string): Promise<any> {
  const program = await getProgram(provider);
  const [protocolPda, protocolBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(anchor.utils.bytes.utf8.encode(seed))],
    program.programId
  );
  return [protocolPda, protocolBump];
}

export async function getProgram(provider: Provider): Promise<any> {
  const programId = new anchor.web3.PublicKey(idl.metadata.address);
  // @ts-ignoreå
  return new anchor.Program(idl, programId, provider);
}

export const toBuffer = (x: any) => {
  console.log("boogie woogie: ", x);
  return Buffer.from(anchor.utils.bytes.utf8.encode(x));
}

export async function requestAirdrop(
  provider: anchor.Provider,
  publicKey: anchor.web3.PublicKey,
  lamports: number
): Promise<void> {
  await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(publicKey, lamports),
    "confirmed"
  );
}

const getBalance = async (payer, mint) => {
  try {
    const parsedAccount = await program.provider.connection.getParsedTokenAccountsByOwner(payer.publicKey, { mint, });
  
    return parsedAccount.value[0].account.data.parsed.info.tokenAmount.uiAmount;
  } catch (error) {
    console.log("No mints found for wallet");
  }
}

/*
export async function getNewTokenAndMint(program, payer): Promise<any> {
  const assetMintAuthority = anchor.web3.Keypair.generate();
  await requestAirdrop(program.provider, assetMintAuthority.publicKey, 10_000_000_000);
  await requestAirdrop(program.provider, payer.publicKey, 10_000_000_000);

  const assetMint = await Token.createMint(program.provider.connection,
    assetMintAuthority,
    assetMintAuthority.publicKey,
    assetMintAuthority.publicKey,
    0,
    spl.TOKEN_PROGRAM_ID);

  const authorityAssetToken = await assetMint.createAssociatedTokenAccount(
      payer.publicKey,
  );
  return {authorityAssetToken, assetMint}
}
*/

  // 1. initialize a new RFQ ecosystem with global state
  // 2. taker creates a new RFQ request, global state gets updated with new RFQ
  // 3. wallet A looks up global state, posts two-way order in this RFQ, posts both as collateral
  // 4. wallet B does the same
  // 5. wallet C does the same
  // 6. wallet A wins the trade, swaps. wallet A and taker recoup their collateral.
  // 7. wallets B & C recoup their collateral

