# InstaChain Testnet Deployment Guide

This guide will help you deploy your InstaChain smart contract to Ethereum testnets.

## What is a Testnet?

A **testnet** is a blockchain network that mimics the main Ethereum network but uses "fake" ETH that has no real value. It's perfect for:

-   Testing your smart contract without spending real money
-   Debugging issues safely
-   Getting free test ETH from faucets
-   Verifying functionality before mainnet deployment

## Prerequisites

Before deploying, you'll need:

1. **A Web3 wallet** (MetaMask recommended)
2. **Test ETH** (free from faucets)
3. **RPC URL** from a provider (Infura, Alchemy, etc.)
4. **Etherscan API key** (for contract verification)

## Step 1: Set Up Your Environment

1. **Copy the environment template:**

    ```bash
    cp env.example .env
    ```

2. **Fill in your `.env` file:**
    ```env
    SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID
    PRIVATE_KEY=your_private_key_here_without_0x_prefix
    ETHERSCAN_API_KEY=your_etherscan_api_key_here
    ```

## Step 2: Get Test ETH

### Sepolia Testnet

-   **Faucet**: https://sepoliafaucet.com/
-   **Alternative**: https://faucet.sepolia.dev/

### Goerli Testnet (Being Deprecated)

-   **Faucet**: https://goerlifaucet.com/

## Step 3: Get Required API Keys

### 1. Infura/Alchemy RPC URL

1. Go to [Infura](https://infura.io/) or [Alchemy](https://alchemy.com/)
2. Create a free account
3. Create a new project
4. Copy the Sepolia RPC URL

### 2. Etherscan API Key

1. Go to [Etherscan](https://etherscan.io/)
2. Create an account
3. Go to API Keys section
4. Create a new API key

## Step 4: Get Your Private Key

⚠️ **WARNING**: Never share your private key with anyone!

1. Open MetaMask
2. Go to Account Details
3. Click "Export Private Key"
4. Enter your password
5. Copy the private key (remove the `0x` prefix if present)

## Step 5: Deploy to Testnet

### Deploy to Sepolia (Recommended)

```bash
npm run deploy:sepolia
```

### Deploy to Goerli

```bash
npm run deploy:goerli
```

## Step 6: Verify Your Contract

After deployment, your contract will be automatically verified on Etherscan if you have an API key.

You can also manually verify:

```bash
npm run verify:sepolia
```

## Step 7: Update Frontend

The deployment script automatically updates your frontend configuration. If you need to manually sync:

```bash
node scripts/syncFrontend.js
```

## Step 8: Test Your Deployment

1. **Check the contract on Etherscan:**

    - Sepolia: https://sepolia.etherscan.io/
    - Goerli: https://goerli.etherscan.io/

2. **Test with your frontend:**
    - Make sure your frontend is configured for the testnet
    - Switch MetaMask to the correct testnet
    - Try creating posts and interacting with the contract

## Troubleshooting

### Common Issues

1. **"Insufficient funds"**

    - Get more test ETH from the faucet

2. **"Nonce too low"**

    - Wait a few minutes or reset your MetaMask account

3. **"Gas estimation failed"**

    - Check your contract code for errors
    - Ensure you have enough test ETH

4. **"Contract verification failed"**
    - Check your Etherscan API key
    - Ensure the contract was deployed successfully

### Getting Help

-   Check the [Hardhat documentation](https://hardhat.org/docs)
-   Visit [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)
-   Join Ethereum Discord communities

## Next Steps

Once your contract is working on testnet:

1. **Test thoroughly** - Try all functions
2. **Get feedback** - Share with others
3. **Fix any issues** - Update and redeploy
4. **Consider mainnet** - When ready for production

## Security Notes

-   Never commit your `.env` file to version control
-   Use a dedicated wallet for testing
-   Keep your private keys secure
-   Test thoroughly before mainnet deployment

---

Happy deploying! 🚀
