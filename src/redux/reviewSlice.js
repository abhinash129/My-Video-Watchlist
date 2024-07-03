// src/redux/reviewSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReview(state, action) {
      const { movieId, review, rating } = action.payload;
      // Assuming you push new review to reviews array
      state.reviews.push({ movieId, review, rating });
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
