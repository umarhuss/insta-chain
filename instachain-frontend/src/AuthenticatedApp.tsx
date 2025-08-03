import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Posts from "./pages/posts";
import Profile from "./pages/profile";

const AuthenticatedApp: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
