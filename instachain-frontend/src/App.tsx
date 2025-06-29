import React from 'react';
import { BrowserRouter } from "react-router-dom";
import useWallet from './hooks/useWallet';
import AuthenticatedApp from './AuthenticatedApp';
import Home from './pages/Home';

const App: React.FC = () => {
  const { walletAddress } = useWallet();

  console.log("Wallet address:", walletAddress);
  return (
    <BrowserRouter>
    {      /* Render AuthenticatedApp if walletAddress is not null, otherwise render Home */}
      {walletAddress !== null ? <AuthenticatedApp /> : <Home />}
    </BrowserRouter>
  );
};

export default App;

