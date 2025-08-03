#!/bin/bash

echo "🚀 InstaChain Testnet Setup Script"
echo "=================================="
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Please edit the .env file with your actual values:"
    echo "   - SEPOLIA_RPC_URL: Get from Infura/Alchemy"
    echo "   - PRIVATE_KEY: Your wallet private key (without 0x prefix)"
    echo "   - ETHERSCAN_API_KEY: Get from Etherscan"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🔧 Next Steps:"
echo "1. Edit .env file with your API keys and private key"
echo "2. Get test ETH from: https://sepoliafaucet.com/"
echo "3. Deploy to Sepolia: npm run deploy:sepolia"
echo "4. Check the DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🎯 Quick Deploy Commands:"
echo "   npm run deploy:sepolia    # Deploy to Sepolia testnet"
echo "   npm run deploy:goerli     # Deploy to Goerli testnet"
echo "   npm run deploy:local      # Deploy to local network"
echo ""
echo "📚 For detailed instructions, see: DEPLOYMENT_GUIDE.md"
