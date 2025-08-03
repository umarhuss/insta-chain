// Contract addresses for different networks
export const contractAddresses: { [key: string]: string } = {
  // Local development
  "0x7a69": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // Hardhat local
  // Testnets
  "0xaa36a7": "0x53D5f0b318cD08cf6c0C84d811139a0294F4Cfbb", // Sepolia (update after deployment)
  "0x5": "0x0000000000000000000000000000000000000000", // Goerli (update after deployment)
  // Mainnet (when ready)
  "0x1": "0x0000000000000000000000000000000000000000", // Ethereum mainnet
};

// Network names for display
export const networkNames: { [key: string]: string } = {
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
