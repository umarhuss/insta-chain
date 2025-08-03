import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
      removeListener: (event: string, callback: (params: any) => void) => void;
    };
  }
}

export default function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async (): Promise<void> => {
      if (!window.ethereum) {
        console.log("🔄 No MetaMask available");
        return;
      }

      // Check if user has logged out
      const loggedOut = localStorage.getItem('loggedOut') === 'true';
      if (loggedOut) {
        console.log("🔄 Skipping wallet check - user logged out");
        return;
      }

      // Check if this is a fresh start (no previous session)
      const hasConnectedBefore = localStorage.getItem('hasConnectedBefore') === 'true';
      if (!hasConnectedBefore) {
        console.log("🔄 Fresh start detected - not auto-connecting");
        return;
      }

      try {
        console.log("🔄 Checking for existing MetaMask connection...");
        const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
        console.log("📋 Found accounts:", accounts);

        if (accounts.length > 0) {
          console.log("✅ Setting wallet address to:", accounts[0]);
          setWalletAddress(accounts[0]);
          console.log("🔄 Wallet address set, should trigger re-render");
        } else {
          console.log("❌ No accounts found");
          setWalletAddress(null);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        setWalletAddress(null);
      }
    };

    checkWalletConnection();
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]): void => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        console.log("🔄 Account changed to:", accounts[0]);
      } else {
        setWalletAddress(null);
        console.log("🚫 Wallet disconnected");
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const connectWallet = async (): Promise<void> => {
    if (!window.ethereum) {
      alert('MetaMask must be installed to use this app.');
      return;
    }

    try {
      setIsConnecting(true);

      // Clear the logout flag when connecting
      localStorage.removeItem('loggedOut');

      // Mark that user has connected before
      localStorage.setItem('hasConnectedBefore', 'true');

      console.log("🔄 Requesting MetaMask connection...");

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        console.log("✅ Wallet connected:", accounts[0]);

        // Force a page reload to ensure the app transitions properly
        console.log("🔄 Forcing page reload to trigger transition...");
        window.location.reload();
      } else {
        console.log("❌ No accounts found");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    console.log("🔄 Logging out...");

    // Clear the wallet address
    setWalletAddress(null);

    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();

    // Set a flag to prevent auto-reconnection
    localStorage.setItem('loggedOut', 'true');

    // Force redirect to home page
    window.location.href = "/";
  };

  return {
    walletAddress,
    connectWallet,
    disconnectWallet,
    isConnecting,
  };
}


