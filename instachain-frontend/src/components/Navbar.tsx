import React from "react";
import { Link } from "react-router-dom";

// create a Navbar component
const Navbar: React.FC = () => {
    return (
        <nav>
            <Link to="/"> Home </Link>
            <Link to="/profile"> Profile </Link>
            <Link to="/posts"> Posts </Link>
            <Link to="/create-post"> Create Post </Link>
        </nav>
    )
};
export default Navbar;
