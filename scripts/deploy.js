const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function main() {
  console.log("📦 Starting deployment...");

  const InstaChain = await ethers.getContractFactory("InstaChain");
  const contract = await InstaChain.deploy();

  console.log("⏳ Transaction sent, waiting for deployment...");
  await contract.deployed();

  const deployedAddress = contract.address;
  console.log("✅ Contract deployed to:", deployedAddress);

  // Save address to deployed.json
  const deploymentInfo = { address: deployedAddress };
  const deployedPath = path.join(__dirname, "deployed.json");
  fs.writeFileSync(deployedPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("📝 Saved deployed address to deployed.json");

  // Sync frontend
  console.log("🔁 Syncing with frontend...");
  execSync("node scripts/syncFrontend.js", { stdio: "inherit" });
}

main().catch((error) => {
  console.error("❌ Deployment failed with error:", error);
  process.exitCode = 1;
});
