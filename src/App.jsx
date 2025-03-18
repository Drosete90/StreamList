import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import MovieSearch from "./pages/MovieSearch";
import StreamList from "./pages/StreamList"; 

function App() {
  return (
    <>
      <NavBar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<MovieSearch />} />
        </Routes>
      </div>
    </>
  );
}

export default App;