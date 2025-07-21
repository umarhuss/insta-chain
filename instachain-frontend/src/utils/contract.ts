import { ethers } from "ethers";
import type { Provider } from "ethers";

// Import latest ABI and contract address from synced files
import InstaChainABI from "./InstaChainABI.json";
import { contractAddress } from "./contractConfig";

// Create and export the contract instance
export function getContract(signerOrProvider: ethers.Signer | Provider) {
  return new ethers.Contract(contractAddress, InstaChainABI, signerOrProvider);
}

