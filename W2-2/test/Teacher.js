const { ethers } = require("hardhat");
const { expect } = require("chai");

let teacher;
let owner;
let otherAccount;

let studentDanielAddress;

describe("Teacher", function () {

    async function init() {
        [owner, otherAccount] = await ethers.getSigners();
        const Teacher = await ethers.getContractFactory("Teacher");
        teacher = await Teacher.deploy("Irving");
        await teacher.deployed();
        console.log("teacher:" + teacher.address);
    }

    before(async function () {
        await init();
    });

    it("create student daniel", async function () {
        const studentDanielAddress = await teacher.connect(owner).createStudent("Daniel");

        console.log('Student Daniel Address ' + ethers.utils.getAddress(studentDanielAddress))

        await expect(await teacher.getStudentListSize()).to.equal(1);
    });

    it("set student daniel's score 100", async function () {
        await expect(await teacher.modifyScore(studentDanielAddress.address, 100)).not.to.be.reverted();
        await expect(await teacher.getStudentScore(studentDanielAddress.address)).equal(100);
    });
});
