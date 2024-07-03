// src/redux/movieSlice.js

import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {
    addMovie: (state, action) => {
      state.push({
        id: Date.now(),
        ...action.payload,
        watched: false, // Add watched status, default to false
        comments: [], // Add comments array
      });
    },
    editMovie: (state, action) => {
      const index = state.findIndex(movie => movie.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      }
    },
    deleteMovie: (state, action) => {
      return state.filter(movie => movie.id !== action.payload);
    },
    addReview: (state, action) => {
      const { movieId, review, rating } = action.payload;
      const index = state.findIndex(movie => movie.id === movieId);
      if (index !== -1) {
        state[index].comments.push({ review, rating });
      }
    },
    toggleWatched: (state, action) => {
      const index = state.findIndex(movie => movie.id === action.payload);
      if (index !== -1) {
        state[index].watched = !state[index].watched;
      }
    },
  },
});

export const { addMovie, editMovie, deleteMovie, addReview, toggleWatched } = movieSlice.actions;
export default movieSlice.reducer;
