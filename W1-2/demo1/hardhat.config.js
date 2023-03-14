require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY1 = "0xe40e83c8b11da254138535a4814cfa2d03fcc4ae550167302f604e6044cfc7e2";
const Mnemonic = "word arrange ladder similar seminar stairs item question crash swarm just tape";
const ADDRESS = "0x598fD7Addd5E7ec72C2B10ABa3AAa91b0Ee43cbd";
const POLYGON_API_KEY = "X3INB926EUTKU1D6KCWBT9TB6TYM3HZ32E";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  networks: {
    goerli: {
      url: "https://eth-goerli.api.onfinality.io/public",
      accounts: [PRIVATE_KEY1],
      chainId: 5,
    },
    
     mumbai: {
      url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      accounts: {
        mnemonic: Mnemonic,
      },
      chainId: 80001,
    },
  },

  etherscan:{
    apiKey:POLYGON_API_KEY
  }
};