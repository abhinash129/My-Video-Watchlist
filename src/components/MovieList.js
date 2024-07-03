// src/components/MovieList.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addReview, deleteMovie, toggleWatched } from '../redux/movieSlice';
import './MovieList.css'; // Import your CSS file

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleDelete = id => {
    dispatch(deleteMovie(id));
  };

  const handleReviewSubmit = (movieId) => {
    if (review.trim() !== '' && rating > 0) {
      dispatch(addReview({ movieId, review, rating }));
      // Reset form after submission
      setReview('');
      setRating(0);
    } else {
      alert('Please provide both review text and rating.');
    }
  };

  const handleToggleWatched = (id) => {
    dispatch(toggleWatched(id));
  };

  return (
    <div className="movie-list-container">
      <h2>Movie List</h2>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} className="movie-item">
            <div className="movie-details">
              <h3>Title: {movie.title}</h3>
              <p><strong>Description:</strong> {movie.description}</p>
              <p><strong>Release Year:</strong> {movie.releaseYear}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              {movie.videoURL && (
                <div className="video-section">
                  <div className="video-container">
                    <video controls>
                      <source src={movie.videoURL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </div>
            <div className="action-section">
              <div className="action-buttons">
                <Link to={`/edit/${movie.id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(movie.id)}>
                  Delete
                </button>
                <button className="watched-button" onClick={() => handleToggleWatched(movie.id)}>
                  Mark as {movie.watched ? 'Unwatched' : 'Watched'}
                </button>
              </div>
              <div className="status">
                <p><strong>Status:</strong> {movie.watched ? 'Watched' : 'Unwatched'}</p>
              </div>
            </div>
            <div className="comments-section">
              <h4>Comments</h4>
              <ul className="comments-list">
                {movie.comments.map((comment, index) => (
                  <li key={index}>
                    <p><strong>Review:</strong> {comment.review}</p>
                    <p><strong>Rating:</strong> {comment.rating}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="review-section">
              <h4>Leave a Review</h4>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
              ></textarea>
              <div className="rating">
                <label>Rating:</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                />
              </div>
              <button onClick={() => handleReviewSubmit(movie.id)}>Submit Review</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
