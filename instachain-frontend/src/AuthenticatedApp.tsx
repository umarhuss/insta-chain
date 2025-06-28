import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "../src/pages/Feed";
import Profile from "../src/pages/profile";
import CreatePost from "../src/pages/createPost";
import Posts from "../src/pages/post";
import Navbar from "../src/components/Navbar";

const AuthenticatedApp: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </>
  );
};

export default AuthenticatedApp;
