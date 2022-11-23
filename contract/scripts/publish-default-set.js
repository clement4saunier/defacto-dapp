// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const RequestBounty = await hre.ethers.getContractFactory("RequestBounty");
  const Token = await hre.ethers.getContractFactory("DefactoToken");
  const token = await Token.attach("0xBAfe1dA303D31a6d99d16F8eC598248a25263d48");
  const requestBounty = await RequestBounty.attach("0x38BCA9EC0Ca54A5081126491E12aBa7a696745ec");

  await requestBounty.deployed();
  await token.deployed();

  console.log(
    `Request Bounty Contract() on ${requestBounty.address}`
  );
  console.log(
    `Defacto Token Contract() on ${token.address}`
  );

  /* Debug Base Data*/
  const approval = await token.approve(requestBounty.address, 2000);
  await approval.wait();
  await requestBounty.publishRequest("QmaasREid7vEwZFTwEEzEm2gu7LEs1DEcS6cJhjgDZ4r2V", token.address, 1000, 1669813452);
  await requestBounty.publishRequest("QmPCLnA6Q3WMiDcMhAstQBaiqMb1rtfVDKiNqfeBer1aRm", token.address, 1000, 1669813452);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
