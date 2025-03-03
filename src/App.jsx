import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ No extra BrowserRouter
import NavBar from "./components/NavBar"; // ✅ My Navbar component (capital B for Mac)
import StreamList from "./pages/StreamList"; // ✅ Adding back my StreamList homepage
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import MovieSearch from "./pages/MovieSearch"; // ✅ My movie search page (API)

function App() {
  return (
    <>
      <NavBar /> {/* My top navigation bar */}
      <Routes>
        <Route path="/" element={<StreamList />} /> {/* ✅ Now my StreamList is back as the homepage */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<MovieSearch />} />
      </Routes>
    </>
  );
}

export default App;