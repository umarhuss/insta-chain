import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function useWallet() {
    // Set up state to hold the Wallet address
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    // Use effect to check if wallet is connected async
    useEffect(() => {
        // check if metaMask is installed
        const checkWalletConnection = async () => {
            if (!window.ethereum){
                return;
            }
            // Check if the user is already connected to a wallet
            try {
                // if so setwalletAddress to the first account in the array
                const accounts = window.ethereum.request({ method: 'eth_accounts'}) as string[];
                if (accounts.length > 0){
                    setWalletAddress(accounts[0]);
                }
            } catch (error) {
                console.error("Error checking wallet connection:", error);
            }
        };
        // Call the function to check wallet connection
        checkWalletConnection();
    }, []);
    // Function to connect to the wallet
    const connectWallet = async () => {
        // Check if metaMask is installed
        if (!window.ethereum){
            alert('MetaMask must be installed to use this app.');
            return;
        }
        // then try request user to connect to their wallet via a button
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
            if (accounts.length > 0) {
                setWalletAddress(accounts[0]);
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    };

    return { walletAddress, connectWallet };

}


