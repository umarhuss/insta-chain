import React from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter.tsx";
import Navbar from './components/Navbar.tsx';
import ConnectWallet from './components/connectWallet.tsx';


function App() {
  return (
    <BrowserRouter>
      <div>
        <ConnectWallet />
        <Navbar />
        <AppRouter />
      </div>
      </BrowserRouter>
  );
}

export default App;
