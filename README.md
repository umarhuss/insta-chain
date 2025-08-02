# InstaChain 📸  
A Decentralised Instagram Clone on the Blockchain

InstaChain is a decentralized Instagram-style photo-sharing application built with **Solidity**, **Hardhat**, **React**, and **TypeScript**. Users can connect their MetaMask wallet, create image posts with captions, and view a personalised feed made up of their own posts and those of their on-chain friends.

> 💡 This project was created as part of a learning journey into full-stack Web3 development. It leverages smart contracts for on-chain data handling and uses a modern frontend built with React and TypeScript.

---

## 🚀 Features

### Core Functionality
- 📷 **Post Images with Captions** - Upload and share images with IPFS storage
- 🧑‍🤝‍🧑 **Add Friends On-Chain** - Build your social network on the blockchain
- 📰 **Personalised Feed** - View posts from you and your friends
- 💬 **Add Comments** - Engage with posts through comments
- 🔐 **MetaMask Wallet Connection** - Secure Web3 authentication

### User Experience
- 👤 **Username System** - Set custom usernames instead of showing wallet addresses
- 🌓 **Dark/Light Mode** - Toggle between themes with persistent preferences
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI/UX** - Instagram-inspired design with smooth animations
- 🔄 **Loading States** - Visual feedback for all interactions

### Advanced Features
- 📁 **Modal Interfaces** - Clean modal dialogs for post creation and username setting
- 🖼️ **Dynamic Image Sizing** - Images automatically resize to fit properly
- 🎯 **Hover Effects** - Interactive elements with smooth transitions
- 📍 **User Posts Page** - Dedicated page to view your own posts
- 🚪 **Logout Functionality** - Proper session management

---

## 🛠 Tech Stack

| Layer          | Stack                               |
|----------------|--------------------------------------|
| **Frontend**   | React, TypeScript, Vite              |
| **Smart Contract** | Solidity, Hardhat, Ethers.js     |
| **Wallet**     | MetaMask                            |
| **Storage**    | IPFS (via Pinata)                   |
| **State Mgmt** | React Hooks, Context API            |
| **Styling**    | CSS3, Custom Design System          |
| **Dev Tools**  | Hardhat, VSCode, Git, GitHub        |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MetaMask browser extension
- Pinata account (for IPFS storage)

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

---

## 📁 Project Structure

```
instachain/
├── contracts/
│   └── instachain.sol          # Main smart contract
├── instachain-frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Main application pages
│   │   ├── hooks/             # Custom React hooks
│   │   ├── contexts/          # React contexts (theme)
│   │   ├── utils/             # Utility functions
│   │   └── types.tsx          # TypeScript type definitions
│   └── public/                # Static assets
├── scripts/
│   ├── deploy.js              # Contract deployment script
│   └── syncFrontend.js        # ABI sync script
└── test/                      # Smart contract tests
```

---

## 🔧 Smart Contract Features

### Core Functions
- `createPost()` - Create new posts with IPFS hash
- `addFriend()` - Add users to your friends list
- `likePost()` - Like/unlike posts
- `registerUsername()` - Set custom username
- `getUsername()` - Retrieve username for any address

### Data Structures
- Posts with metadata (author, caption, timestamp, location, IPFS hash)
- User relationships (friends system)
- Like tracking per user per post
- Username mapping

---

## 🎨 UI/UX Highlights

- **Instagram-inspired Design** - Familiar social media interface
- **Smooth Animations** - Hover effects and transitions
- **Responsive Layout** - Works on all screen sizes
- **Accessibility** - Proper contrast and keyboard navigation
- **Loading States** - Visual feedback for all operations

---

## 🔐 Security Features

- **MetaMask Integration** - Secure wallet connection
- **Smart Contract Validation** - On-chain data integrity
- **IPFS Storage** - Decentralized content storage
- **Input Validation** - Frontend and contract-level validation

---

## 🚀 Deployment

### Local Development
- Hardhat local network for testing
- Vite dev server for frontend
- MetaMask connected to localhost:8545

### Future Plans
- Sepolia testnet deployment
- Mainnet deployment
- IPFS gateway optimization

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Hardhat team for the excellent development framework
- MetaMask for wallet integration
- Pinata for IPFS storage solutions
- The Web3 community for inspiration and support

---

**Built with ❤️ for the decentralized web**



