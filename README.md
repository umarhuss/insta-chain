# InstaChain - Decentralized Social Media Platform

A decentralized social media platform built on Ethereum that allows users to create posts, like, comment, and interact with friends on the blockchain.

## 🚀 Live Demo

-   **Frontend**: [Your GitHub Pages URL will go here]
-   **Smart Contract**: [0x53D5f0b318cD08cf6c0C84d811139a0294F4Cfbb](https://sepolia.etherscan.io/address/0x53D5f0b318cD08cf6c0C84d811139a0294F4Cfbb)
-   **Network**: Sepolia Testnet

## 🎯 Features

-   ✅ **Create Posts** - Upload images/videos to IPFS and post to blockchain
-   ✅ **Like Posts** - Like and unlike posts with on-chain verification
-   ✅ **Comment System** - Add comments and replies to posts
-   ✅ **Friend System** - Add friends and see their posts in your feed
-   ✅ **User Profiles** - Set usernames and view user information
-   ✅ **Decentralized Storage** - All media stored on IPFS
-   ✅ **Real-time Updates** - Live feed updates from blockchain

## 🛠️ Tech Stack

-   **Frontend**: React + TypeScript + Vite
-   **Blockchain**: Ethereum (Sepolia Testnet)
-   **Smart Contract**: Solidity
-   **Storage**: IPFS (InterPlanetary File System)
-   **Wallet Integration**: MetaMask
-   **Styling**: CSS + Tailwind CSS

## 🚀 Quick Start

### Prerequisites

1. **MetaMask Wallet** - [Download here](https://metamask.io/)
2. **Test ETH** - Get free test ETH from faucets
3. **Modern Browser** - Chrome, Firefox, Safari, or Edge

### Setup Instructions

#### 1. Get Test ETH

You'll need test ETH to interact with the dApp:

-   **Google Cloud Faucet**: [https://cloud.google.com/application/web3/faucet/ethereum/sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
-   **Sepolia Faucet**: [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
-   **Chainlink Faucet**: [https://faucets.chain.link/sepolia](https://faucets.chain.link/sepolia)

#### 2. Connect Your Wallet

1. **Install MetaMask** if you haven't already
2. **Add Sepolia Network** to MetaMask:
    - Network Name: `Sepolia`
    - RPC URL: `https://sepolia.infura.io/v3/YOUR-PROJECT-ID`
    - Chain ID: `11155111`
    - Currency Symbol: `ETH`
3. **Get test ETH** from one of the faucets above
4. **Connect your wallet** to the dApp

#### 3. Start Using InstaChain

1. **Visit the live demo** (link will be added after deployment)
2. **Connect your MetaMask wallet**
3. **Create your first post** by clicking "Create Post"
4. **Upload an image/video** and add a caption
5. **Submit the transaction** and approve in MetaMask
6. **View your post** in the feed!

## 🏗️ Development Setup

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   MetaMask wallet

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/umarhuss/insta-chain.git
    cd insta-chain
    ```

2. **Install dependencies**

    ```bash
    npm install
    cd instachain-frontend
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp env.example .env
    # Edit .env with your API keys
    ```

4. **Deploy to testnet**

    ```bash
    npm run deploy:sepolia
    ```

5. **Start the frontend**
    ```bash
    cd instachain-frontend
    npm run dev
    ```

## 📋 Smart Contract Functions

### Core Functions

-   `createPost(string caption, string location, string ipfsHash)` - Create a new post
-   `likePost(uint256 postId)` - Like/unlike a post
-   `addComment(uint256 postId, string comment, uint256 replyTo)` - Add a comment
-   `addFriends(address friend)` - Add a friend
-   `setUsername(string username)` - Set your username

### View Functions

-   `getUserAndFriendsPosts(address user)` - Get posts from user and friends
-   `getLikeCount(uint256 postId)` - Get like count for a post
-   `hasUserLikedPost(address user, uint256 postId)` - Check if user liked post
-   `getUsername(address user)` - Get username for an address

## 🔗 Contract Information

-   **Contract Address**: `0x53D5f0b318cD08cf6c0C84d811139a0294F4Cfbb`
-   **Network**: Sepolia Testnet
-   **Etherscan**: [https://sepolia.etherscan.io/address/0x53D5f0b318cD08cf6c0C84d811139a0294F4Cfbb](https://sepolia.etherscan.io/address/0x53D5f0b318cD08cf6c0C84d811139a0294F4Cfbb)
-   **ABI**: Available in `instachain-frontend/src/utils/InstaChainABI.json`

## 🎯 Project Structure

```
instachain/
├── contracts/
│   └── instachain.sol          # Smart contract
├── instachain-frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/             # Page components
│   │   ├── utils/             # Contract utilities
│   │   └── contexts/          # React contexts
│   └── public/                # Static assets
├── scripts/
│   ├── deploy.js              # Deployment script
│   └── syncFrontend.js        # Frontend sync script
└── test/                      # Contract tests
```

## 🚀 Deployment

### Smart Contract

The smart contract is deployed on Sepolia testnet and verified on Etherscan.

### Frontend

The frontend can be deployed to:

-   **GitHub Pages** (recommended for demos)
-   **Netlify** (easy deployment)
-   **Vercel** (great for React apps)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

-   Ethereum Foundation for the Sepolia testnet
-   IPFS for decentralized storage
-   MetaMask for wallet integration
-   Google Cloud for the testnet faucet

---

**Ready to experience decentralized social media? Connect your wallet and start posting! 🚀**
# Force rebuild
