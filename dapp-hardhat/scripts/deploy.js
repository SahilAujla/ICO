const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { CRYPTO_DEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

let contractAddress;

async function main() {
  // Address of the Crypto Devs NFT contract that you deployed in the previous module
  const cryptoDevsNFTContract = CRYPTO_DEVS_NFT_CONTRACT_ADDRESS;

  /*
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
    so cryptoDevsTokenContract here is a factory for instances of our CryptoDevToken contract.
    */
  const cryptoDevsTokenContract = await ethers.getContractFactory(
    "CryptoDevToken"
  );

  // deploy the contract
  const deployedCryptoDevsTokenContract = await cryptoDevsTokenContract.deploy(
    cryptoDevsNFTContract
  );

  // print the address of the deployed contract
  console.log(
    "Crypto Devs Token Contract Address:",
    deployedCryptoDevsTokenContract.address
  );

  contractAddress = deployedCryptoDevsContract.address;

  saveAbi();
  saveContractAddress();
}

function saveAbi() {
  const fs = require("fs");

  const abiDir = __dirname + "/../../dapp-nextjs/constants";

  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir);
  }

  const artifact = artifacts.readArtifactSync("CryptoDevToken");

  fs.writeFileSync(
    abiDir + "/CryptoDevToken.json",
    JSON.stringify(artifact, null, 2)
  );
}

function saveContractAddress() {
  const fs = require("fs");

  const abiDir = __dirname + "/../../dapp-nextjs/constants";

  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir);
  }

  const data = `export const NFT_CONTRACT_ADDRESS = "${cryptoDevsNFTContract}";
  export const TOKEN_CONTRACT_ADDRESS = "${contractAddress}";`;

  fs.writeFileSync(abiDir + "/contract.js", data);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
