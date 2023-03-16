const { ethers } = require("hardhat");
const { expect } = require("chai");

let bank;
let counter;

describe("Bank", function () {
  async function init() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();
    console.log("bank:" + counter.address);
  }

  // async function init1(){
  //   const [owner, otherAccount] = await ethers.getSigners();
  //   const Bank = await ethers.getContractFactory("Counter");
  //   bank = await Bank.deploy();
  //   await bank.deployed();
  //   console.log("bank:" + bank.address);
  // }

  before(async function () {
    await init();
  });

  // 
  it("init equal 0", async function () {
    expect(await counter.get()).to.equal(0);
  });

  it("owner add 1 equal 1", async function () {
    let tx = await counter.count();
    await tx.wait();
    expect(await counter.get()).to.equal(1);
  });

  //other account 
  it("other add 1 equal 2", async function () {
    counter.connect(otherAccount);
    let tx = await counter.count();
    await tx.wait();
    expect(await counter.get()).to.equal(2);
  });

});