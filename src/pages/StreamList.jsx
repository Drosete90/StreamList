import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function StreamList() {
  const [movie, setMovie] = useState(""); // State for input
  const [movies, setMovies] = useState([]); // State for movie list
  const [editingIndex, setEditingIndex] = useState(null); // Track which movie is being edited
  const [editText, setEditText] = useState(""); // Store edited text

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim() === "") return;

    setMovies([...movies, { title: movie, completed: false }]); // Add new movie to list
    setMovie(""); // Clear input field
  };

  // Handle movie deletion
  const handleDelete = (index) => {
    setMovies(movies.filter((_, i) => i !== index)); // Remove movie from the list
  };

  // Handle marking a movie as completed
  const handleComplete = (index) => {
    setMovies(
      movies.map((m, i) =>
        i === index ? { ...m, completed: !m.completed } : m
      )
    );
  };

  // Handle editing a movie
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditText(movies[index].title);
  };

  // Save the edited movie
  const handleSaveEdit = (index) => {
    setMovies(
      movies.map((m, i) => (i === index ? { ...m, title: editText } : m))
    );
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="container">
      <h1>StreamList</h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Add movies to your watchlist.
      </p>
      <form onSubmit={handleSubmit}>
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
      <ul>
        {movies.map((m, index) => (
          <li key={index} className={m.completed ? "completed" : ""}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <span>{m.title}</span>
                <div className="icons">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    onClick={() => handleComplete(index)}
                    className={m.completed ? "completed-icon" : "icon"}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(index)}
                    className="icon"
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(index)}
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
}

export default StreamList;