import React from 'react';
import { BrowserRouter } from "react-router-dom";
import useWallet from './hooks/useWallet';
import AuthenticatedApp from './AuthenticatedApp';
import Home from './pages/Home';

const App: React.FC = () => {
  const { walletAddress } = useWallet();

  return (
    <BrowserRouter>
      {walletAddress ? <AuthenticatedApp /> : <Home />}
    </BrowserRouter>
  );
};

export default App;

