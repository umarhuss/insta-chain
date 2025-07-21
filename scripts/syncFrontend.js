const fs = require('fs');
const path = require('path');

const contractName = "InstaChain";

// Create the absolute path to where the ABI address should be saved
const frontendPath = path.join(__dirname, '..', 'instachain-frontend', 'src', 'utils');

// Create abi file path
const abiPath = path.join(__dirname, '..', 'artifacts', 'contracts', 'instachain.sol', `${contractName}.json`);

// Load deployed address from deployed.json
const deployedInfo = JSON.parse(fs.readFileSync(path.join(__dirname, "deployed.json"), "utf8"));
const deployedAddress = deployedInfo.address;

// Sync function to copy ABI and address to frontend
function syncABI(){
  const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const abi = contractJson.abi;

  if (!fs.existsSync(frontendPath)) {
    fs.mkdirSync(frontendPath, { recursive: true });
  }

  fs.writeFileSync(
    path.join(frontendPath, "InstaChainABI.json"),
    JSON.stringify(abi, null, 2)
  );

  console.log("✅ ABI synced to frontend.");
}

// Sync address
function syncAddress(){
    const output = `export const contractAddress = "${deployedAddress}";\n`;

      fs.writeFileSync(
    path.join(frontendPath, "contractConfig.ts"),
    output
  );
  console.log("✅ Contract address synced to frontend.");
}

// Run both syncs
syncABI();
syncAddress();
