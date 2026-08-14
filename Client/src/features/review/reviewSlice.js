import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieReviews } from "./api";
import { createAppAsyncThunk } from "@/utils/createAppAsyncThunk";

export const getMovieReviews = createAppAsyncThunk(
  "/fetch/movie/reviews",
  fetchMovieReviews,
);

const movieReviewSlice = createSlice({
  name: "movieReviewSlice",
  initialState: {
    movieReviews: null,
    loading: {
      reviewsLoading: false,
    },
    error: {
      reviewsError: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //REVIEWS
      .addCase(getMovieReviews.pending, (state) => {
        state.loading.reviewsLoading = true;
        state.loading.reviewsError = null;
        state.error.reviewsError = null;
      })
      .addCase(getMovieReviews.fulfilled, (state, action) => {
        state.loading.reviewsLoading = false;
        state.movieReviews = action.payload;
        
      })
      .addCase(getMovieReviews.rejected, (state, action) => {
        state.loading.reviewsLoading = false;
        const actions = action.payload?.message;
        state.error.reviewsError =
          actions == 404
            ? "404:We looked everywhere. Even under the couch. Nothing. 🎬"
            : actions == 502 || actions == 504
              ? "Request sent. Response stuck in traffic."
              : "500: Server is having feelings. Please respect its space.";
      });
  },
});

export default movieReviewSlice.reducer;
