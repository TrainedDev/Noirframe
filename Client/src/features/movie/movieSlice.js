import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMoviePage,
  nowPlayingMovie,
  popularMovies,
  thisWeekTrendingMovies,
  topRatedMovies,
  upComingMovies,
} from "./api";
import { createAppAsyncThunk } from "@/utils/createAppAsyncThunk";

export const fetchCurrentMoviesInTheater = createAppAsyncThunk(
  "/fetch/nowPlayingMovie",
  nowPlayingMovie,
);

export const fetchTrendingMovies = createAppAsyncThunk(
  "/fetch/trending/movies",
  thisWeekTrendingMovies,
);
export const fetchTopRatedMovies = createAppAsyncThunk(
  "/fetch/top/movies",
  topRatedMovies,
);
export const fetchUpcoming_movies = createAppAsyncThunk(
  "/fetch/upcoming/movies",
  upComingMovies,
);
export const fetchPopularMovies = createAppAsyncThunk(
  "/fetch/popular/movies",
  popularMovies,
);
export const getMoviesPage = createAppAsyncThunk(
  "/fetch/movies/page", fetchMoviePage,
);

const movieSlice = createSlice({
  name: "movieSlice",
  initialState: {
    nowPlayingMoviesData: null,
    trendingMoviesData: null,
    topRatedMoviesData: null,
    upcomingMoviesData: null,
    popularMoviesData: null,
    movieData: null,

    loading: {
      nowPlayingLoading: false,
      topRatedLoading: false,
      moviePageLoading: false,
      trendingLoading: false,
      upcomingLoading: false,
      popularLoading: false,
    },
    error: {
      nowPlayingError: null,
      topRatedError: null,
      trendingError: null,
      upcomingError: null,
      popularError: null,
      moviePageError: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // NOW PLAYING
      .addCase(fetchCurrentMoviesInTheater.pending, (state) => {
        state.loading.nowPlayingLoading = true;
        state.loading.nowPlayingError = null;
      })
      .addCase(fetchCurrentMoviesInTheater.fulfilled, (state, action) => {
        state.loading.nowPlayingLoading = false;
        state.nowPlayingMoviesData = action.payload;
      })
      .addCase(fetchCurrentMoviesInTheater.rejected, (state, action) => {
        state.loading.nowPlayingLoading = false;
        const actions = action.payload?.message;
        state.error.nowPlayingError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
              ? "/funny_504.jpeg"
              : "/500.jpeg";
      })

      // TRENDING
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading.trendingLoading = true;
        state.loading.trendingError = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading.trendingLoading = false;
        state.trendingMoviesData = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading.trendingLoading = false;
        const actions = action.payload?.message;
        state.error.trendingError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
              ? "/fun_movieCard.jpeg"
              : "/500.jpeg";
      })

      // POPULAR
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading.popularLoading = true;
        state.loading.popularError = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading.popularLoading = false;
        state.popularMoviesData = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading.popularLoading = false;
        const actions = action.payload?.message;
        state.error.popularError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
              ? "/fun_movieCard.jpeg"
              : "/500.jpeg";
      })

      // TOP RATED
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading.topLoading = true;
        state.loading.topRatedError = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.loading.topLoading = false;
        state.topRatedMoviesData = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading.topLoading = false;
        const actions = action.payload?.message;
        state.error.topRatedError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
              ? "/fun_movieCard.jpeg"
              : "/500.jpeg";
      })

      // UPCOMING
      .addCase(fetchUpcoming_movies.pending, (state) => {
        state.loading.upcomingLoading = true;
        state.loading.upcomingError = null;
      })
      .addCase(fetchUpcoming_movies.fulfilled, (state, action) => {
        state.loading.upcomingLoading = false;
        state.upcomingMoviesData = action.payload;
      })
      .addCase(fetchUpcoming_movies.rejected, (state, action) => {
        state.loading.upcomingLoading = false;
        const actions = action.payload?.message;
        state.error.upcomingError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
              ? "/funny_504.jpeg"
              : "/500.jpeg";
      })

      // MOVIE PAGE
      .addCase(getMoviesPage.pending, (state) => {
        state.loading.moviePageLoading = true;
        state.loading.moviePageError = null;
      })
      .addCase(getMoviesPage.fulfilled, (state, action) => {
        state.loading.moviePageLoading = false;
        state.movieData = action.payload;
      })
      .addCase(getMoviesPage.rejected, (state, action) => {
        state.loading.moviePageLoading = false;
        const actions = action.payload?.message;
        state.error.moviePageError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
              ? "/funny_504.jpeg"
              : "/500.jpeg";
      });
  },
});

export default movieSlice.reducer;
