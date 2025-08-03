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
const network = deployedInfo.network || "hardhat";

// Network to chainId mapping
const networkToChainId = {
  "hardhat": "0x7a69",
  "sepolia": "0xaa36a7",
  "goerli": "0x5",
  "mainnet": "0x1"
};

const chainId = networkToChainId[network] || "0x7a69";

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

// Sync address for the specific network
function syncAddress(){
  const configPath = path.join(frontendPath, "contractConfig.ts");

  // Read existing config if it exists
  let configContent = "";
  if (fs.existsSync(configPath)) {
    configContent = fs.readFileSync(configPath, "utf8");
  }

  // If config doesn't exist or is the old format, create new one
  if (!configContent.includes("contractAddresses")) {
    configContent = `// Contract addresses for different networks
export const contractAddresses = {
  // Local development
  "0x7a69": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // Hardhat local
  // Testnets
  "0xaa36a7": "0x0000000000000000000000000000000000000000", // Sepolia (update after deployment)
  "0x5": "0x0000000000000000000000000000000000000000", // Goerli (update after deployment)
  // Mainnet (when ready)
  "0x1": "0x0000000000000000000000000000000000000000", // Ethereum mainnet
};

// Network names for display
export const networkNames = {
  "0x7a69": "Local Development",
  "0xaa36a7": "Sepolia Testnet",
  "0x5": "Goerli Testnet",
  "0x1": "Ethereum Mainnet",
};

// Get contract address based on current network
export const getContractAddress = (chainId: string): string => {
  return contractAddresses[chainId] || contractAddresses["0x7a69"];
};

// Get network name for display
export const getNetworkName = (chainId: string): string => {
  return networkNames[chainId] || "Unknown Network";
};

// Legacy export for backward compatibility
export const contractAddress = contractAddresses["0x7a69"];
`;
  }

  // Update the specific network address
  const addressRegex = new RegExp(`"${chainId}": "0x[0-9a-fA-F]{40}"`, 'g');
  const newAddressEntry = `"${chainId}": "${deployedAddress}"`;

  if (addressRegex.test(configContent)) {
    // Replace existing address
    configContent = configContent.replace(addressRegex, newAddressEntry);
  } else {
    // Add new address entry
    configContent = configContent.replace(
      /export const contractAddresses = {/,
      `export const contractAddresses = {\n  "${chainId}": "${deployedAddress}",`
    );
  }

  fs.writeFileSync(configPath, configContent);
  console.log(`✅ Contract address synced to frontend for network: ${network} (${chainId})`);
  console.log(`📍 Address: ${deployedAddress}`);
}

// Run both syncs
syncABI();
syncAddress();
