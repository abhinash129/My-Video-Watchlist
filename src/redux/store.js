// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    // Add other reducers as needed
  },
});

export default store;
