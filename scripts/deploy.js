const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  const InstaChain = await ethers.getContractFactory("InstaChain");
  console.log("Got contract factory");

  const contract = await InstaChain.deploy();
  console.log("Transaction sent, waiting for deployment...");

  await contract.deployed(); // <-- Use this for ethers v5
  console.log("Contract deployed to:", contract.address); // <-- Use .address for ethers v5
}

main().catch((error) => {
  console.error("Deployment failed with error:", error);
  process.exitCode = 1;
});
