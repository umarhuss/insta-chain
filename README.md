# InstaChain 📸

A Decentralised Instagram Clone on the Blockchain

InstaChain is a decentralized Instagram-style photo-sharing application built with **Solidity**, **Hardhat**, **React**, and **TypeScript**. Users can connect their MetaMask wallet, create image posts with captions, and view a personalised feed made up of their own posts and those of their on-chain friends.

> 💡 This project was created as part of a learning journey into full-stack Web3 development. It leverages smart contracts for on-chain data handling and uses a modern frontend built with React and TypeScript.

---

## 🚀 Features

### Core Functionality

-   📷 **Post Images with Captions** - Upload and share images with IPFS storage
-   🧑‍🤝‍🧑 **Add Friends On-Chain** - Build your social network on the blockchain
-   📰 **Personalised Feed** - View posts from you and your friends
-   💬 **Add Comments** - Engage with posts through comments (frontend state for optimal UX)
-   🔐 **MetaMask Wallet Connection** - Secure Web3 authentication

### User Experience

-   👤 **Username System** - Set custom usernames instead of showing wallet addresses
-   🌓 **Dark/Light Mode** - Toggle between themes with persistent preferences
-   📱 **Responsive Design** - Works seamlessly on desktop and mobile
-   🎨 **Modern UI/UX** - Instagram-inspired design with smooth animations
-   🔄 **Loading States** - Visual feedback for all interactions

### Advanced Features

-   📁 **Modal Interfaces** - Clean modal dialogs for post creation and username setting
-   🖼️ **Dynamic Image Sizing** - Images automatically resize to fit properly
-   🎯 **Hover Effects** - Interactive elements with smooth transitions
-   📍 **User Posts Page** - Dedicated page to view your own posts
-   🚪 **Logout Functionality** - Proper session management
-   🔄 **Fresh Start Support** - Clean blockchain resets for development

---

## 🛠 Tech Stack

| Layer              | Stack                        |
| ------------------ | ---------------------------- |
| **Frontend**       | React, TypeScript, Vite      |
| **Smart Contract** | Solidity, Hardhat, Ethers.js |
| **Wallet**         | MetaMask                     |
| **Storage**        | IPFS (via Pinata)            |
| **State Mgmt**     | React Hooks, Context API     |
| **Styling**        | CSS3, Custom Design System   |
| **Dev Tools**      | Hardhat, VSCode, Git, GitHub |

---

## 🏗️ Architecture Decisions

### Hybrid Storage Approach

-   **Posts**: Stored on-chain for permanence and decentralization
-   **Comments**: Stored in frontend state for optimal user experience
-   **Images**: Stored on IPFS for decentralized file storage
-   **Usernames**: Stored on-chain for global uniqueness

### Why This Approach?

-   **Posts are permanent** - Survive blockchain restarts and server crashes
-   **Comments are fast** - Instant feedback without gas fees
-   **Future-ready** - Comments can be moved on-chain in future versions
-   **User-friendly** - Balances decentralization with practical UX

---

## 🚀 Quick Start

### Prerequisites

-   Node.js (v16 or higher)
-   MetaMask browser extension
-   Pinata account (for IPFS storage)

## 🌐 Testnet Deployment

This dApp is also deployed on **Sepolia Testnet**:

- **Contract Address**: `0x53D5f0b318cD08cf6c0C84d811139a0294F4Cfbb`
- **Etherscan**: [View Contract](https://sepolia.etherscan.io/address/0x53D5f0b318cD08cf6c0C84d811139a0294F4Cfbb)
- **Network**: Sepolia Testnet

### To use the testnet version:
1. Connect MetaMask to Sepolia network
2. Get test ETH from a faucet (see links below)
3. The dApp will automatically connect to the deployed contract

### Testnet Faucets:
- **Google Cloud Faucet**: [https://cloud.google.com/application/web3/faucet/ethereum/sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- **Sepolia Faucet**: [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
- **Chainlink Faucet**: [https://faucets.chain.link/sepolia](https://faucets.chain.link/sepolia)

### Local Development:
For development and testing, run `npm run dev` for local deployment.

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
    cd instachain-frontend
    cp .env.example .env
    # Add your Pinata JWT token to .env
    ```

4. **Start the development environment**

    ```bash
    # Terminal 1: Start Hardhat node
    npx hardhat node

    # Terminal 2: Deploy contract
    npx hardhat run scripts/deploy.js --network localhost

    # Terminal 3: Start frontend
    cd instachain-frontend
    npm run dev
    ```

5. **Connect MetaMask**

    - Open MetaMask
    - Add network: `http://localhost:8545`
    - Import one of the test accounts from the Hardhat output

6. **Visit the app**
    - Open `http://localhost:5173`
    - Connect your wallet and start posting!

### Fresh Start Development

To completely reset the blockchain and start fresh:

```bash
# Kill all processes
pkill -f "hardhat" && pkill -f "vite"

# Start fresh
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
cd instachain-frontend && npm run dev
```

---

## 📁 Project Structure

```

```
