import React, { useState } from "react";
import axios from "axios";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const API_KEY = "ef67a17aa4199b26bebbfbd94385f7ea"; // Your TMDB API key

  const searchMovies = async (e) => {
    e.preventDefault();
    
    if (!query) {
      console.log("No query entered.");
      return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    
    try {
      console.log("Fetching data from:", url);
      const response = await axios.get(url);
      console.log("API Response:", response.data);

      if (!response.data.results || response.data.results.length === 0) {
        console.warn("No movies found.");
        setMovies([]); // Clear the list
        return;
      }

      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <h1>Search for Movies</h1>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <p>No Image Available</p>
              )}
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date ? movie.release_date : "Unknown"}</p>
            </div>
          ))
        ) : (
          <p>No movies found. Try another search.</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;