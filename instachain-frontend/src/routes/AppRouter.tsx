import React from "react";
import { Routes, Route } from "react-router-dom";
import useWallet from "../hooks/useWallet";
import Home from "../pages/Home";
import AuthenticatedApp from "../AuthenticatedApp";

const AppRouter: React.FC = () => {
  const { walletAddress } = useWallet();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {walletAddress && (
        <Route path="/*" element={<AuthenticatedApp />} />
      )}
    </Routes>
  );
};

export default AppRouter;

