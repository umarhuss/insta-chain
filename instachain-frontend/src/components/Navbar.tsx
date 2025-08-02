import { Camera, Home, Image, LogOut, Moon, Sun, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import useWallet from "../hooks/useWallet";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { disconnectWallet } = useWallet();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const handleLogout = async (): Promise<void> => {
    console.log("🔄 Logout button clicked");

    try {
      await disconnectWallet();
    } catch (error) {
      console.error("❌ Logout failed:", error);
      // Even if it fails, try to redirect
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Camera size={20} />
          <span>InstaChain</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <Home size={16} />
            <span>Feed</span>
          </Link>
          <Link
            to="/profile"
            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
          >
            <User size={16} />
            <span>Profile</span>
          </Link>
          <Link
            to="/posts"
            className={`nav-link ${isActive('/posts') ? 'active' : ''}`}
          >
            <Image size={16} />
            <span>Posts</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="theme-toggle"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
