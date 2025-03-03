import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const StreamList = () => {
  const [movie, setMovie] = useState(""); // State for input field
  const [movies, setMovies] = useState([]); // State to store movie list
  const [editingIndex, setEditingIndex] = useState(null); // Track which movie is being edited
  const [editText, setEditText] = useState(""); // Store edited text

  // Load saved movies from LocalStorage when the page loads
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(savedMovies);
  }, []);

  // Save movies to LocalStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Handle adding a new movie
  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim() === "") return; // Prevent empty input

    // Add a new movie with a UUID for a unique key
    setMovies([...movies, { id: uuidv4(), title: movie, completed: false }]);
    setMovie(""); // Clear input field
  };

  // Handle deleting a movie
  const handleDelete = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  // Handle marking a movie as completed
  const handleComplete = (id) => {
    setMovies(
      movies.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  // Handle editing a movie
  const handleEdit = (id) => {
    setEditingIndex(id);
    const movieToEdit = movies.find((m) => m.id === id);
    setEditText(movieToEdit.title);
  };

  // Save the edited movie
  const handleSaveEdit = (id) => {
    setMovies(
      movies.map((m) => (m.id === id ? { ...m, title: editText } : m))
    );
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="container">
      <h1>StreamList</h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Add movies to your watchlist. Your list is saved automatically.
      </p>
      <form onSubmit={handleSubmit} className="movie-form">
        <input
          type="text"
          placeholder="Enter movie name"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Display the list of movies */}
      {movies.length > 0 && <h2>Your Movies</h2>}
      <ul className="movie-list">
        {movies.map((m) => (
          <li key={m.id} className={`movie-item ${m.completed ? "completed" : ""}`}>
            {editingIndex === m.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(m.id)}>Save</button>
              </>
            ) : (
              <>
                <span className="movie-title">{m.title}</span>
                <div className="icons">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    onClick={() => handleComplete(m.id)}
                    className={`icon ${m.completed ? "completed-icon" : ""}`}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(m.id)}
                    className="icon"
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(m.id)}
                    className="icon delete-icon"
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;