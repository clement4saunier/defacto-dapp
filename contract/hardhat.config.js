require("@nomicfoundation/hardhat-toolbox");

//Trash free tier api keys, do not use for anything but testnet deployment
const ALCHEMY_API_KEY = "eR2zP7Ou8AtJ3q_B8_Nc-TsycRwq3MAO";
const NODE_REAL_KEY = "97074dcb99374df280739365234d65b8";

//Trash Testnet Addresses, do not use for anything but testnet deployment
const DEV_PRIVATE_KEYS = [
  "b821a380da8af997cb28a22eb673e789145d24b8a4c20bfbc85da2b172727a53", //0x4237c3Cd20D3b6702d25c13f1E6E70bEF1428d59
  "481209ecafa309eb9afd5c7e9e1ea2be562273ff332f8f5b09e25c4dbcbbc6bf", //0xa7667Ed1f93245be28FEF3A74A515116711e095e
  "6264c9cb335b78fd689d301b6be42311cfbc64d0d8a06bcccb20592653b0ad57", //0xAE5fFE4EC3C0268f1C5514EE2e828b7594fDbAF0
  "3e3d3297264f12ef798ffdb65f2b5ef51d1f1fa557c48f03067bb15ef9775575" //0xF8db9599dD0c87931F3B8b3B89Fb7D718792e185
]

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: DEV_PRIVATE_KEYS
    },
    BNBtestnet: {
      url: `https://bsc-testnet.nodereal.io/v1/${NODE_REAL_KEY}`,
      accounts: DEV_PRIVATE_KEYS
    },
  },
  solidity: "0.8.17"
};
