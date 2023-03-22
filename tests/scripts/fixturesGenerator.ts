import path from "path";
import fs from "fs";
import fsPromise from "node:fs/promises";
import { spawn } from "node:child_process";

import * as toml from "toml";
import { rimraf } from "rimraf";
import { executeInParallel, sleep } from "../utilities/helpers";
import { PublicKey, Keypair, Connection, Version } from "@solana/web3.js";
import { CollateralMint, Context, Mint } from "../utilities/wrappers";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { SpotInstrument } from "../utilities/instruments/spotInstrument";
import { PsyoptionsAmericanInstrumentClass } from "../utilities/instruments/psyoptionsAmericanInstrument";
import { PsyoptionsEuropeanInstrument } from "../utilities/instruments/psyoptionsEuropeanInstrument";
import {
  BITCOIN_BASE_ASSET_INDEX,
  DEFAULT_COLLATERAL_FUNDED,
  SOLANA_BASE_ASSET_INDEX,
  SWITCHBOARD_BTC_ORACLE,
  SWITCHBOARD_SOL_ORACLE,
} from "../utilities/constants";
import { RiskCategory } from "../utilities/types";
import {
  fixtureAccountsPath,
  fixtureKeypairsPath,
  fixturesBasePath,
  pubkeyNamingFilePath,
  testsDirectory,
} from "../utilities/fixtures";

const ledgerPath = path.join(".anchor", "test-ledger");
const buildDirectoryPath = path.join("target", "deploy");
const anchorConfigPath = "Anchor.toml";
const anchorTestConfig = "Test.toml";
const validatorOutput = path.join(ledgerPath, "validator-output.log");
const validatorPort = "8899";

const testFixturesBlockStart = `
# start of autogenerated fixtures
# DO NOT MODIFY MANUALLY
`;
const testFixturesBlockEnd = `
# end of autogenerated fixtures
`;

const namedPubkeys: { [pubkey: string]: string } = {};
const savedAccountFixtures: { pubkey: PublicKey; name: string }[] = [];

async function main() {
  clearFixtures();

  await launchLocalValidator();

  const context = new Context();
  await context.basicInitialize();

  // create and save payers
  await executeInParallel(
    async () => {
      const dao = await context.createPayer();
      context.dao = dao;
      await savePayer(context, context.dao, "dao");
    },
    async () => {
      const taker = await context.createPayer();
      context.taker = taker;
      await savePayer(context, context.taker, "taker");
    },
    async () => {
      const maker = await context.createPayer();
      context.maker = maker;
      await savePayer(context, context.maker, "maker");
    }
  );

  // create and save mints and related token accounts
  await executeInParallel(
    async () => {
      const assetToken = await Mint.create(context);
      context.assetToken = assetToken;
      await saveMint(context, context.assetToken, "btc");
    },
    async () => {
      const additionalAssetToken = await Mint.create(context);
      context.additionalAssetToken = additionalAssetToken;
      await saveMint(context, context.additionalAssetToken, "sol");
    },
    async () => {
      const quoteToken = await Mint.create(context);
      context.quoteToken = quoteToken;
      await saveMint(context, context.quoteToken, "usd-quote");
    },
    async () => {
      const collateralToken = await CollateralMint.create(context);
      context.collateralToken = collateralToken;
      await saveMint(context, context.collateralToken, "usd-collateral");
    }
  );

  await context.initializeProtocol();

  await executeInParallel(
    async () => {
      await context.riskEngine.initializeDefaultConfig();
    },
    // add instruments
    async () => {
      await SpotInstrument.addInstrument(context);
    },
    async () => {
      await PsyoptionsEuropeanInstrument.addInstrument(context);
    },
    async () => {
      await PsyoptionsAmericanInstrumentClass.addInstrument(context);
    },
    // initialize and fund collateral accounts
    async () => {
      await context.initializeCollateral(context.taker);
      await context.fundCollateral(context.taker, DEFAULT_COLLATERAL_FUNDED);
      await saveCollateralPdas(context, context.taker.publicKey, "taker");
    },
    async () => {
      await context.initializeCollateral(context.maker);
      await context.fundCollateral(context.maker, DEFAULT_COLLATERAL_FUNDED);
      await saveCollateralPdas(context, context.maker.publicKey, "maker");
    },
    async () => {
      await context.initializeCollateral(context.dao);
      await saveCollateralPdas(context, context.dao.publicKey, "dao");
    },
    // add base assets, register mints and save accounts
    async () => {
      const { baseAssetPda } = await context.addBaseAsset(
        BITCOIN_BASE_ASSET_INDEX,
        "BTC",
        RiskCategory.VeryLow,
        SWITCHBOARD_BTC_ORACLE
      );
      await context.assetToken.register(BITCOIN_BASE_ASSET_INDEX);

      await saveAccountAsFixture(context, baseAssetPda, "rfq-base-asset-btc");
      await saveAccountAsFixture(context, context.assetToken.mintInfoAddress as PublicKey, "rfq-mint-info-btc");
    },
    async () => {
      const { baseAssetPda } = await context.addBaseAsset(
        SOLANA_BASE_ASSET_INDEX,
        "SOL",
        RiskCategory.Medium,
        SWITCHBOARD_SOL_ORACLE
      );
      await context.additionalAssetToken.register(SOLANA_BASE_ASSET_INDEX);

      await saveAccountAsFixture(context, baseAssetPda, "rfq-base-asset-sol");
      await saveAccountAsFixture(
        context,
        context.additionalAssetToken.mintInfoAddress as PublicKey,
        "rfq-mint-info-sol"
      );
    },
    async () => {
      await context.quoteToken.register(null);

      await saveAccountAsFixture(context, context.quoteToken.mintInfoAddress as PublicKey, "rfq-mint-info-usd-quote");
    }
  );

  // postpone saving protocol and risk engine config after all initialization
  // to capture all internal changes in those accounts
  await executeInParallel(
    () => saveAccountAsFixture(context, context.protocolPda, "rfq-protocol"),
    () => saveAccountAsFixture(context, context.riskEngine.configAddress, "risk-engine-config")
  );

  await savePubkeyNaming();
  await writeFixturesToTestConfigs();
  process.exit();
}

async function launchLocalValidator() {
  await rimraf(ledgerPath);
  await fsPromise.mkdir(ledgerPath);

  const outputFile = fs.createWriteStream(validatorOutput);
  const programsToDeploy = await parsePrograms();
  const validatorProgramParams = programsToDeploy.flatMap(({ address, binaryPath }) => {
    return ["--bpf-program", address, binaryPath];
  });

  const wallet = NodeWallet.local();
  const validator = spawn("solana-test-validator", [
    "--ledger",
    ledgerPath,
    "--rpc-port",
    validatorPort,
    "--mint",
    wallet.publicKey.toString(),
    ...validatorProgramParams,
  ]);
  validator.stdout.pipe(outputFile);
  validator.stderr.pipe(outputFile);
  validator.on("exit", (code) => {
    if (code !== null) {
      console.error("Validator have thrown an error, aborting a process!");
      console.error(`Check validator output at ${validatorOutput}`);
      process.exit(1);
    }
  });
  process.on("exit", () => {
    validator.kill();
  });
  await waitForValidator();
}

async function parsePrograms() {
  const anchorToml = await fsPromise.readFile(anchorConfigPath, { encoding: "utf-8" });
  const anchorConfig = toml.parse(anchorToml);
  const localnetPrograms = anchorConfig.programs.localnet;
  const programsInfo = [];
  for (const name in localnetPrograms) {
    const address = localnetPrograms[name] as string;
    programsInfo.push({
      name,
      address,
      binaryPath: path.join(buildDirectoryPath, `${name}.so`),
    });

    namedPubkeys[address] = name.replace(/_/g, "-");
  }

  return programsInfo;
}

async function waitForValidator(): Promise<void> {
  const connection = new Connection(`http://localhost:${validatorPort}`);
  let version: Version | null = null;

  while (!version) {
    try {
      version = await connection.getVersion();
    } catch (err) {
      console.log("Validator is not online yet. Waiting 1 second...");
      await sleep(1);
    }
  }

  console.log("Validator is online!");
}

async function clearFixtures() {
  await rimraf(fixturesBasePath);
  await fsPromise.mkdir(fixturesBasePath);
  await fsPromise.mkdir(fixtureAccountsPath);
  await fsPromise.mkdir(fixtureKeypairsPath);
}

async function saveCollateralPdas(context: Context, owner: PublicKey, ownerName: string) {
  await saveAccountAsFixture(
    context,
    await context.collateralToken.getTokenPda(owner),
    `rfq-collateral-token-${ownerName}`
  );
  await saveAccountAsFixture(
    context,
    await context.collateralToken.getInfoPda(owner),
    `rfq-collateral-info-${ownerName}`
  );
}

async function savePayer(context: Context, keypair: Keypair, name: string) {
  const content = JSON.stringify(Array.from(keypair.secretKey));
  const keypairPath = path.join(fixtureKeypairsPath, `${name}.json`);
  await fsPromise.writeFile(keypairPath, content);

  await saveAccountAsFixture(context, keypair.publicKey, `account-${name}`);
}

async function saveMint(context: Context, mint: Mint, name: string) {
  await saveAccountAsFixture(context, mint.publicKey, `mint-${name}`);

  await executeInParallel(
    () => saveTokenAccount(context, mint, context.dao.publicKey, `${name}-dao`),
    () => saveTokenAccount(context, mint, context.taker.publicKey, `${name}-taker`),
    () => saveTokenAccount(context, mint, context.maker.publicKey, `${name}-maker`)
  );
}

async function saveTokenAccount(context: Context, mint: Mint, owner: PublicKey, name: string) {
  const address = await mint.getAssociatedAddress(owner);
  await saveAccountAsFixture(context, address, `token-account-${name}`);
}

async function savePubkeyNaming() {
  const content = JSON.stringify(namedPubkeys, null, 2);
  await fsPromise.writeFile(pubkeyNamingFilePath, content);
}

async function saveAccountAsFixture(context: Context, pubkey: PublicKey, name: string) {
  namedPubkeys[pubkey.toString()] = name;
  savedAccountFixtures.push({ pubkey, name });
  const content = await accountToJson(context, pubkey);
  const filePath = path.join(fixtureAccountsPath, `${name}.json`);
  await fsPromise.writeFile(filePath, content);
}

async function accountToJson(context: Context, pubkey: PublicKey) {
  const account = await context.provider.connection.getAccountInfo(pubkey);
  if (!account) {
    throw Error("Expected existing account, found none");
  }
  let content = {
    pubkey,
    account: {
      lamports: account.lamports,
      data: [account.data.toString("base64"), "base64"],
      owner: account.owner,
      executable: account.executable,
      rentEpoch: 0,
    },
  };
  return JSON.stringify(content, null, 2);
}

async function writeFixturesToTestConfigs() {
  const testConfigs = findFilesByName(testsDirectory, anchorTestConfig);

  for (const configPath of testConfigs) {
    const fileContent = await fsPromise.readFile(configPath, { encoding: "utf-8" });
    const blockStart = fileContent.indexOf(testFixturesBlockStart);
    const blockEnd = fileContent.indexOf(testFixturesBlockEnd) + testFixturesBlockEnd.length;

    if (blockStart === -1 || blockEnd === -1) {
      continue;
    }

    const fixtureNameToRelativePath = (name: string) => {
      const fixturePath = path.join(fixtureAccountsPath, name + ".json");
      return path.relative(path.dirname(configPath), fixturePath);
    };

    const newBlock =
      testFixturesBlockStart +
      savedAccountFixtures
        .map(
          ({ pubkey, name }) => `
[[test.validator.account]]
address = "${pubkey.toString()}"
filename = "${fixtureNameToRelativePath(name)}"
`
        )
        .join("") +
      testFixturesBlockEnd;

    let newFileContent = fileContent.slice(0, blockStart) + newBlock + fileContent.slice(blockEnd);
    await fsPromise.writeFile(configPath, newFileContent);
    console.log(`Updated fixtures in ${configPath}`);
  }
}

function findFilesByName(rootPath: string, fileName: string): string[] {
  const results: string[] = [];

  const find = (currentPath: string) => {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        find(filePath);
      } else if (file === fileName) {
        results.push(filePath);
      }
    });
  };

  find(rootPath);

  return results;
}

main()
  .then(() => {})
  .catch((err) => {
    console.log(err);
    process.exit();
  });
