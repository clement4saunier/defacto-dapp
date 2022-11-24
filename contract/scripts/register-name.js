// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main(a) {
  const Registry = await hre.ethers.getContractFactory("DelegateRegistry");
  const registry = Registry.attach("0xE445cb06267D788137062E767DDc030e9e47B570");

  console.log("Deployed Registry at", registry.address);
  await registry.mint("0x45fBE88cd2DE3f9a829872B931CbB046FFd1475E", "defacto", "QmTU2V6dFvB4XoF3HacojF9EywG9xSqBxqxJd1HYEMseJf");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
