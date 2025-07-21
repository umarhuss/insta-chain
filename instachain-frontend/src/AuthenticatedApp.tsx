import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Feed from "../src/pages/Feed";
import Profile from "../src/pages/profile";
import Posts from "../src/pages/post";
import Navbar from "../src/components/Navbar";

const AuthenticatedApp: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </>
  );
};

export default AuthenticatedApp;
