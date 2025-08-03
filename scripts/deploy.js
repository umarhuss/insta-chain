const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function main() {
  console.log("📦 Starting deployment...");

  // Get the network from Hardhat's built-in network detection
  const network = hre.network.name;
  console.log(`🌐 Deploying to network: ${network}`);

  const InstaChain = await ethers.getContractFactory("InstaChain");
  const contract = await InstaChain.deploy();

  console.log("⏳ Transaction sent, waiting for deployment...");
  await contract.deployed();

  const deployedAddress = contract.address;
  console.log("✅ Contract deployed to:", deployedAddress);
  console.log("🔗 Contract address:", deployedAddress);

  // Save address to deployed.json with network info
  const deploymentInfo = {
    address: deployedAddress,
    network: network,
    deployedAt: new Date().toISOString()
  };
  const deployedPath = path.join(__dirname, "deployed.json");
  fs.writeFileSync(deployedPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("📝 Saved deployed address to deployed.json");

  // Verify contract on Etherscan if not on hardhat network
  if (network !== "hardhat" && process.env.ETHERSCAN_API_KEY) {
    console.log("🔍 Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: deployedAddress,
        constructorArguments: [],
      });
      console.log("✅ Contract verified on Etherscan!");
    } catch (error) {
      console.log("⚠️ Contract verification failed:", error.message);
    }
  }

  // Sync frontend
  console.log("🔁 Syncing with frontend...");
  execSync("node scripts/syncFrontend.js", { stdio: "inherit" });
}

main().catch((error) => {
  console.error("❌ Deployment failed with error:", error);
  process.exitCode = 1;
});
