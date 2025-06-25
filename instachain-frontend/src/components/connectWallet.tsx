import React from 'react';
import useWallet from '../hooks/useWallet';




const ConnectWallet: React.FC = () => {
    const { walletAddress, connectWallet } = useWallet();

  return (
    <div>
        {walletAddress ? (
            <p>Connected wallet: {walletAddress}</p>
        ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
        )}
    </div>
  );
};

export default ConnectWallet;


