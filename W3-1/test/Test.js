const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test-W3-1", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  let owner;
  let otherAccount1;
  let otherAccount2;

  let irvingToken;
  let vault;

  async function init() {
     [owner, otherAccount1,otherAccount2] = await ethers.getSigners();
  }

  before(function(){
    init();
  })

  it("Deployment", async function () {

    // async function deployToken(){
      const IrvingToken = await ethers.getContractFactory("IrvingToken");
      irvingToken = await IrvingToken.deploy();

      console.log("IrvingToken","address = "+irvingToken.address);

      expect(await irvingToken.balanceOf(owner.address)).to.equal(10n ** 22n);

      const Vault = await ethers.getContractFactory("Vault");
      vault = await Vault.deploy();

      console.log("vault","address = "+vault.address);

      expect(await irvingToken.balanceOf(owner.address)).not.to.be.reverted;

  });

  it("owner transfer to otherAccount1 100 IT", async function () {
    expect(await irvingToken.connect(owner).transfer(otherAccount1.address,100n * 10n ** 18n)).not.to.be.reverted;
    expect(await irvingToken.connect(otherAccount1).balanceOf(otherAccount1.address)).to.equal(100n * 10n ** 18n);
  });

  it("user1 approve", async function () {
    expect(await irvingToken.connect(otherAccount1).approve(vault.address,2n ** 256n - 1n)).not.to.be.reverted;
  });

  it("user1 deposit 50 IT", async function () {
    expect(await vault.connect(otherAccount1).deposite(irvingToken.address,50n * 10n ** 18n)).not.to.be.reverted;

    console.log('otherAccount1 balance',await irvingToken.connect(otherAccount1).balanceOf(otherAccount1.address));
  });


  it("user1 withdraw 66 IT", async function () {
    await expect(vault.connect(otherAccount1).withdraw(irvingToken.address,66n * 10n ** 18n)).to.be.reverted;

    console.log('otherAccount1 balance',await irvingToken.connect(otherAccount1).balanceOf(otherAccount1.address));
  });

  it("owner transfer to otherAccount2 100 IT", async function () {
    expect(await irvingToken.connect(owner).transfer(otherAccount2.address,100n * 10n ** 18n)).not.to.be.reverted;
    expect(await irvingToken.connect(otherAccount2).balanceOf(otherAccount2.address)).to.equal(100n * 10n ** 18n);
  });

  it("user2 deposit 50 IT", async function () {
    expect(vault.connect(otherAccount2).deposite(irvingToken.address,50n * 10n ** 18n)).to.be.reverted;

    console.log('otherAccount1 balance',await irvingToken.connect(otherAccount2).balanceOf(otherAccount2.address));
  });

});
