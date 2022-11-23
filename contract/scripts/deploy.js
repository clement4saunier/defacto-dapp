// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const requestBountyArgs = [];
  const RequestBounty = await hre.ethers.getContractFactory("RequestBounty");
  const Token = await hre.ethers.getContractFactory("DefactoToken");
  const token = await Token.deploy("Defacto", "FACT");
  const requestBounty = await RequestBounty.deploy(...requestBountyArgs);

  await requestBounty.deployed();
  await token.deployed();

  console.log(
    `Request Bounty Contract(${[...requestBountyArgs].join(', ')}) deployed to ${requestBounty.address}`
  );
  console.log(
    `Defacto Token Contract() deployed to ${token.address}`
  );

  /* Debug Base Data*/
  await token.approve(requestBounty.address, 2000);
  const {value} = await requestBounty.publishRequest("QmaasREid7vEwZFTwEEzEm2gu7LEs1DEcS6cJhjgDZ4r2V", token.address, 0, 1669813452);
  console.log("ID?", value);
  await requestBounty.publishResponse(value, "QmaasREid7vEwZFTwEEzEm2gu7LEs1DEcS6cJhjgDZ4r2V");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
