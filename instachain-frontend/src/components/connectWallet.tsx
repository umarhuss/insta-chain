import { Check, Loader2, Wallet } from "lucide-react";
import React, { useEffect } from "react";
import useWallet from "../hooks/useWallet";

const ConnectWallet: React.FC = () => {
  const { walletAddress, connectWallet, isConnecting } = useWallet();

  const handleConnect = async () => {
    try {
      console.log("🔄 Connect Wallet button clicked");
      console.log("🔄 Current wallet address before connect:", walletAddress);

      await connectWallet();

      console.log("🔄 Connect Wallet completed");
      console.log("🔄 New wallet address after connect:", walletAddress);
    } catch (error) {
      console.error("❌ Failed to connect wallet:", error);
    }
  };

  // Force re-render when wallet address changes
  useEffect(() => {
    console.log("🔄 ConnectWallet component - walletAddress changed to:", walletAddress);
  }, [walletAddress]);

  console.log("🔄 ConnectWallet component - walletAddress:", walletAddress);

  if (walletAddress) {
    return (
      <div className="flex items-center justify-center gap-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-white font-medium">
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
        <Check size={20} className="text-green-400" />
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="connect-wallet-button"
    >
      {isConnecting ? (
        <>
          <Loader2 className="loading-spinner" size={20} />
          Connecting...
        </>
      ) : (
        <>
          <Wallet size={20} />
          Connect Wallet
        </>
      )}
    </button>
  );
};

export default ConnectWallet;


