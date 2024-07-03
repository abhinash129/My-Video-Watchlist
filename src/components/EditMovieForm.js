// src/components/EditMovieForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editMovie } from '../redux/movieSlice';
import './EditMovieForm.css'; // Import your CSS file

const EditMovieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const movie = useSelector((state) =>
    state.movies.find((movie) => movie.id === Number(id))
  );

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [releaseDate, setReleaseDate] = useState(movie.releaseDate); // Changed state variable name
  const [genre, setGenre] = useState(movie.genre);
  const [videoURL, setVideoURL] = useState(movie.videoURL);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setVideoURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editMovie({
        id: movie.id,
        title,
        description,
        releaseDate, // Updated to use releaseDate state
        genre,
        videoURL,
      })
    );
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Release Year:</label>
        <input
          type="date" // Changed to date input type
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <label>Upload New Video:</label>
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovieForm;
