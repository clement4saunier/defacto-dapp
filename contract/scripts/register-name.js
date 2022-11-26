// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main(a) {
  const Registry = await hre.ethers.getContractFactory("DelegateRegistry");
  const registry = Registry.attach("0xCDcaaE4123132d7D5a788840dA3F12ea43F05bc1");

  console.log("Deployed Registry at", registry.address);
  console.log("txn", await registry.mint("0x45fBE88cd2DE3f9a829872B931CbB046FFd1475E", "politifacts", "bafkreigtjmcppxtysh3djlfev5sq2w3wc67o4nlqdyr6fqnsvbrfgidpoe"));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
