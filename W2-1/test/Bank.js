const { ethers } = require("hardhat");
const { expect } = require("chai");

let bank;
let owner;
let otherAccount;

describe("Bank", function () {

  async function init() {
    [owner, otherAccount] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy(0);
    await bank.deployed();
    console.log("bank:" + bank.address);
  }

  before(async function () {
    await init();
  });

  it("owner deposit 1", async function () {
    await expect(await bank.connect(owner).deposit({value:1})).not.reverted;
    console.log('getUserBalance owner',await bank.getUserBalancae(owner.address));
    await expect(await bank.getContractBalance()).to.equal(1);
  });

  it("owner setDepositMinValue 10", async function () {
    await expect(bank.connect(owner).setDepositMinValue(10)).not.reverted;
    await expect(await bank.getContractBalance()).to.equal(1);
  });

  it("owner deposit 2 fail", async function () {
    await expect(bank.deposit({value:2})).to.be.revertedWith("Value Too Low");

    await expect(await bank.getContractBalance()).equal(1);
  });

  it("other account deposit 11 ", async function () {
    await expect(await bank.connect(otherAccount).deposit({value:11})).not.reverted;

    await expect(await bank.getContractBalance()).equal(12);
  });

  it("other account deposit 78", async function () {
    await expect(await bank.connect(otherAccount).deposit({value:78})).not.reverted;

    await expect(await bank.getContractBalance()).equal(90);;
  });

  it("other account withdraw 90 fail", async function () {
    await expect(bank.connect(otherAccount).withdraw(90)).to.be.revertedWithCustomError(bank,'BalanceNotEnough');

    await expect(await bank.getContractBalance()).equal(90);
  });

  it("other account withdraw 9", async function () {
    await expect(await bank.connect(otherAccount).withdraw(9)).not.reverted;

    await expect(await bank.getContractBalance()).equal(81);
  });

  it("other account withdrawAll", async function () {
    await expect(await bank.connect(otherAccount).withdrawAll()).not.reverted;

    await expect(await bank.getContractBalance()).equal(1);;
  });

  it("other account rug", async function () {
    await expect(bank.connect(otherAccount).rug()).to.be.revertedWith('Ownable: caller is not the owner');

    await expect(await bank.getContractBalance()).equal(1);
  });

  it("owner account rug", async function () {
    await expect(await bank.connect(owner).rug()).not.reverted;

    await expect(await bank.getContractBalance()).equal(0);
  });

});
