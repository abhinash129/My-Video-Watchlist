// src/components/AddMovieForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../redux/movieSlice';
import './AddMovieForm.css'; // Import your CSS file

function AddMovieForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [videoURL, setVideoURL] = useState('');

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setVideoURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMovie({ title, description, releaseYear, genre, videoURL }));
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Release Year:</label>
        <input type="date" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />

        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />

        <label>Upload Video:</label>
        <input type="file" accept="video/*" onChange={handleVideoUpload} />

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovieForm;
