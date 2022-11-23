// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("DefactoToken");

  const currencies = [
    ["Bitcoin", "BTC"],
    ["Ether", "wETH"],
    ["USDC", "USDC"],
    ["USDT", "USDT"]
  ];

  const deploy = async ([name, symbol]) => ({
    name,
    symbol,
    instance: await Token.deploy(name, symbol)
  });

  let c = [];
  for (let i = 0; i < currencies.length; i++) {
    c[i] = await deploy(currencies[i]);
  }

  console.log(
    c
      .map(
        ({ name, symbol, instance }) =>
          name + " " + symbol + ":" + instance.address
      )
      .join("\n")
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
