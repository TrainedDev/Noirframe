import { createSlice } from "@reduxjs/toolkit";
import {
  recommendMovies,
  similarMovies,
  upComingMovies,
  fetchMoviePage,
} from "./api";
import { createAppAsyncThunk } from "@/utils/createAppAsyncThunk";

export const fetchRecommendMovieLists = createAppAsyncThunk(
  "/fetch/movie/recommends",
  recommendMovies,
);
export const fetchSimilarMovieLists = createAppAsyncThunk(
  "/fetch/movie/similar",
  similarMovies,
);

export const fetchUpcoming_movies = createAppAsyncThunk(
  "/fetch/upcoming/movies",
  upComingMovies,
);

export const getMoviesPage = createAppAsyncThunk(
  "/fetch/movies/page",
  fetchMoviePage,
);

const movieDetailSlice = createSlice({
  name: "movieDetailSlice",
  initialState: {
    movieData: null,
    upcomingMoviesData: null,
    recommendMoviesData: null,
    similarMoviesData: null,

    loading: {
      moviePageLoading: false,
      upcomingLoading: false,
      similarLoading: false,
      recommendLoading: false,
    },
    error: {
      moviePageError: null,
      upcomingError: null,
      similarError: null,
      recommendError: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // UPCOMING
      .addCase(fetchUpcoming_movies.pending, (state) => {
        state.loading.upcomingLoading = true;
        state.error.upcomingError = null;
      })
      .addCase(fetchUpcoming_movies.fulfilled, (state, action) => {
        state.loading.upcomingLoading = false;
        state.upcomingMoviesData = action.payload;
      })
      .addCase(fetchUpcoming_movies.rejected, (state, action) => {
        state.loading.upcomingLoading = false;
        const actions = action.payload;
        state.error.upcomingError =
          actions.status == 404
            ? "/404.jpeg"
            : actions.status == 502 || actions.status == 504
              ? "/funny_504.jpeg"
              : "/500.jpeg";
      })
      //MOVIE PAGE
      .addCase(getMoviesPage.pending, (state) => {
        state.loading.moviePageLoading = true;
        state.error.moviePageError = null;
      })
      .addCase(getMoviesPage.fulfilled, (state, action) => {
        state.loading.moviePageLoading = false;
        state.movieData = action.payload;
        state.error.moviePageError = null;
      })
      .addCase(getMoviesPage.rejected, (state, action) => {
        state.loading.moviePageLoading = false;
        const actions = action.payload;
        state.error.moviePageError =
          actions.status == 404
            ? "/404.jpeg"
            : actions.status == 502 || actions.status == 504
              ? "/funny_504.jpeg"
              : "/500.jpeg";
      })
      // SIMILAR
      .addCase(fetchSimilarMovieLists.pending, (state) => {
        state.loading.similarLoading = true;
        state.error.similarError = null;
      })
      .addCase(fetchSimilarMovieLists.fulfilled, (state, action) => {
        state.loading.similarLoading = false;
        state.similarMoviesData = action.payload;
        state.error.similarError = null;
      })
      .addCase(fetchSimilarMovieLists.rejected, (state, action) => {
        state.loading.similarLoading = false;
        const actions = action.payload;
        state.error.similarError =
          (actions.status == actions.status) == 502 || actions.status == 504
            ? "/fun_movieCard.jpeg"
            : "/500.jpeg";
      })

      // RECOMMEND
      .addCase(fetchRecommendMovieLists.pending, (state) => {
        state.loading.recommendLoading = true;
        state.error.recommendError = null;
      })
      .addCase(fetchRecommendMovieLists.fulfilled, (state, action) => {
        state.loading.recommendLoading = false;
        state.recommendMoviesData = action.payload;
        state.error.recommendError = null;
      })
      .addCase(fetchRecommendMovieLists.rejected, (state, action) => {
        state.loading.recommendLoading = false;
        const actions = action.payload;
        state.error.recommendError =
          (actions.status == actions.status) == 502 || actions.status == 504
            ? "/fun_movieCard.jpeg"
            : "/500.jpeg";
      });
  },
});

export default movieDetailSlice.reducer;
