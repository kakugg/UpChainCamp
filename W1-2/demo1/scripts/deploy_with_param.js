const hre = require("hardhat");
const {ethers,network,artifacts} = require("hardhat");

async function main(){
    // await hre.compile('compile');
    const Bank  = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy(Math.pow(10,9));
    await bank.deployed();
    console.log("Bank contract has deployed,address:"+bank.address);
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })