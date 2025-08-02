import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import AuthenticatedApp from './AuthenticatedApp';
import { ThemeProvider } from './contexts/ThemeContext';
import useWallet from './hooks/useWallet';
import Home from './pages/Home';

const App: React.FC = () => {
  const { walletAddress } = useWallet();

  return (
    <ThemeProvider>
      <BrowserRouter>
        {walletAddress !== null ? <AuthenticatedApp /> : <Home />}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

