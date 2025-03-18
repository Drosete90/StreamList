import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure this file exists

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/about">About</Link>
      <Link to="/search">Movie Search</Link>
    </nav>
  );
};

export default NavBar;