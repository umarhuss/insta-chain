import type { Provider } from "ethers";
import { ethers } from "ethers";

// Import latest ABI and contract address from synced files
import InstaChainABI from "./InstaChainABI.json";
import { getContractAddress } from "./contractConfig";

// Create and export the contract instance
export async function getContract(signerOrProvider: ethers.Signer | Provider) {
  // Get the network directly from the provider
  const network = await signerOrProvider.provider?.getNetwork();
  const chainId = `0x${network?.chainId?.toString(16)}` || "0x7a69";
  const address = getContractAddress(chainId);

  console.log("🔗 Contract Debug:");
  console.log("  Chain ID:", chainId);
  console.log("  Contract Address:", address);
  console.log("  Network:", network);

  return new ethers.Contract(address, InstaChainABI, signerOrProvider);
}

