import { Camera, Shield, Sparkles, Users } from "lucide-react";
import React from "react";
import ConnectWallet from "../components/connectWallet";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Camera size={48} className="text-white" />
              <h1 className="home-title">InstaChain</h1>
            </div>
            <p className="home-subtitle">
              The decentralized Instagram experience. Share your moments on the blockchain with
              true ownership, privacy, and control over your content.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md-grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white-20 rounded-full flex items-center justify-center mx-auto">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Decentralized</h3>
              <p className="text-white-80 text-sm">
                Your content is stored on IPFS and secured by blockchain technology
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white-20 rounded-full flex items-center justify-center mx-auto">
                <Sparkles size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Own Your Data</h3>
              <p className="text-white-80 text-sm">
                True ownership of your content with no corporate surveillance
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white-20 rounded-full flex items-center justify-center mx-auto">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Social Network</h3>
              <p className="text-white-80 text-sm">
                Connect with friends, like posts, and comment on the blockchain
              </p>
            </div>
          </div>

          {/* Connect Wallet */}
          <div className="space-y-4">
            <ConnectWallet />
            <p className="text-white/60 text-sm text-center">
              Connect your MetaMask wallet to get started
            </p>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm">
              Built with React, TypeScript, Solidity, and IPFS
            </p>
            <p className="text-white/40 text-xs">
              A Web3 learning project showcasing full-stack blockchain development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
