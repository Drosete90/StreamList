import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import styles for Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <h2>StreamList</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/search">Movie Search</Link></li> {/* Added Search Page */}
      </ul>
    </nav>
  );
}

export default Navbar;