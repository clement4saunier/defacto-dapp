const {
  time,
  loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function() {
  describe("Request", function() {
    let requests;
    let registry;
    let token;

    beforeEach(async () => {
      const [owner, acc1, acc2] = await ethers.getSigners();
      const RequestBounty = await ethers.getContractFactory("RequestBounty");
      const DelegateRegistry = await ethers.getContractFactory(
        "DelegateRegistry"
      );
      const DefactoToken = await ethers.getContractFactory("DefactoToken");

      token = await DefactoToken.deploy("A", "B");
      registry = await DelegateRegistry.deploy();
      requests = await RequestBounty.deploy(registry.address);
      await registry.mint(owner.address, "owner", "QmG210D");
      await registry.mint(acc1.address, "account", "QmG210Dd");
      await registry.mint(acc2.address, "fact-checker", "QmG210qd");
    });

    it("Should publish and retrieve hash", async function() {
      const [owner, acc1, acc2] = await ethers.getSigners();
      const content = "Qm31209I2JK1d";
      const content2 = "Qm31209I2JKdqs1d";

      await token.approve(requests.address, 10000000000000);
      console.log(await token.allowance(owner.address, requests.address));
      const id = await requests.publishRequest(
        content,
        token.address,
        14,
        12039812321,
        "owner"
      );
      console.log("balance", await token.balanceOf(owner.address));
      console.log("balance", await token.balanceOf(requests.address));
      console.log("balance", await token.balanceOf(acc1.address));
      console.log("balance", await token.balanceOf(acc2.address));
      await requests
        .connect(acc1)
        .publishResponse(ethers.utils.id(content), content);
      await requests
        .connect(acc2)
        .publishResponse(ethers.utils.id(content), content2);
      await requests.settleRequest(
        ethers.utils.id(content),
        [ethers.utils.id(content), ethers.utils.id(content2)],
        [50, 50]
      );
      console.log("-balance", await token.balanceOf(owner.address));
      console.log("balance", await token.balanceOf(requests.address));
      console.log("balance", await token.balanceOf(acc1.address));
      console.log("balance", await token.balanceOf(acc2.address));
    });
  });
});
