import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchFilteredMovieList,
  fetchGenreAndTags,
  fetchMoviePage,
  fetchMovieReviews,
  fetchUserSearchMedia,
  nowPlayingMovie,
  popularMovies,
  recommendMovies,
  similarMovies,
  thisWeekTrendingMovies,
  topRatedMovies,
  upComingMovies,
} from "./movieApi";

export const fetchCurrentMoviesInTheater = createAsyncThunk(
  "/fetch/nowPlayingMovie",
  nowPlayingMovie
);
export const fetchTrendingMovies = createAsyncThunk(
  "/fetch/trending/movies",
  thisWeekTrendingMovies
);
export const fetchTopMovies = createAsyncThunk(
  "/fetch/top/movies",
  topRatedMovies
);
export const fetchUpcoming_movies = createAsyncThunk(
  "/fetch/upcoming/movies",
  upComingMovies
);
export const fetchPopularMovies = createAsyncThunk(
  "/fetch/popular/movies",
  popularMovies
);
export const getMoviesPage = createAsyncThunk(
  "/fetch/movies/page",
  async (id) => fetchMoviePage(id)
);
export const fetchRecommendMovieLists = createAsyncThunk(
  "/fetch/movie/recommends",
  async (id) => recommendMovies(id)
);
export const fetchSimilarMovieLists = createAsyncThunk(
  "/fetch/movie/similar",
  async (id) => similarMovies(id)
);
export const getGenresAndTags = createAsyncThunk(
  "/fetch/movie/genre/tags",
  fetchGenreAndTags
);
export const getFilterMovieLists = createAsyncThunk(
  "fetch/movie/filter/lists",
  async (data) => fetchFilteredMovieList(data)
);

export const getMovieReviews = createAsyncThunk(
  "/fetch/movie/reviews",
  async (id) => fetchMovieReviews(id)
);

export const getUserSearchedResults = createAsyncThunk(
  "/fetch/search/media",
  async (name) => fetchUserSearchMedia(name)
);

const movieSlice = createSlice({
  name: "movieApi",
  initialState: {
    nowPlayingMoviesData: null,
    trendingMoviesData: null,
    topMoviesData: null,
    upcomingMoviesData: null,
    popularMoviesData: null,
    movieData: null,
    filterMoviesData: null,
    movieGenresAndTagsData: null,
    recommendMoviesData: null,
    similarMoviesData: null,
    movieReviews: null,
    searchedData: null,
    loading: {
      nowPlayingLoading: false,
      topLoading: false,
      moviePageLoading: false,
      trendingLoading: false,
      reviewsLoading: false,
      genresLoading: false,
      upcomingLoading: false,
      popularLoading: false,
      similarLoading: false,
      filterLoading: false,
      recommendLoading: false,
      searchedLoading: false,
    },
    error: {
      searchedError: false,
      nowPlayingError: null,
      topError: null,
      trendingError: null,
      upcomingError: null,
      popularError: null,
      moviePageError: null,
      reviewsError: null,
      genresError: null,
      similarError: null,
      filterError: null,
      recommendError: null,
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
        const actions = action.error.message;
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
        const actions = action.error?.message;
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
        const actions = action.error?.message;
        state.error.popularError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
            ? "/fun_movieCard.jpeg"
            : "/500.jpeg";
      })

      // TOP
      .addCase(fetchTopMovies.pending, (state) => {
        state.loading.topLoading = true;
        state.loading.topError = null;
      })
      .addCase(fetchTopMovies.fulfilled, (state, action) => {
        state.loading.topLoading = false;
        state.topMoviesData = action.payload;
      })
      .addCase(fetchTopMovies.rejected, (state, action) => {
        state.loading.topLoading = false;
        const actions = action.error?.message;
        state.error.topError =
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
        const actions = action.error?.message;
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
        const actions = action.error?.message;
        state.error.moviePageError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
            ? "/funny_504.jpeg"
            : "/500.jpeg";
      })

      // FILTER
      .addCase(getFilterMovieLists.pending, (state) => {
        state.loading.filterLoading = true;
        state.loading.filterError = null;
      })
      .addCase(getFilterMovieLists.fulfilled, (state, action) => {
        state.loading.filterLoading = false;
        state.filterMoviesData = action.payload;
      })
      .addCase(getFilterMovieLists.rejected, (state, action) => {
        state.loading.filterLoading = false;
        const actions = action.error?.message;
        state.error.filterError =
          actions == 404
            ? "404:We looked everywhere. Even under the couch. Nothing. 🎬"
            : actions == 502 || actions == 504
            ? "Request sent. Response stuck in traffic."
            : "500: Server is having feelings. Please respect its space.";
      })

      // SIMILAR
      .addCase(fetchSimilarMovieLists.pending, (state) => {
        state.loading.similarLoading = true;
        state.loading.similarError = null;
      })
      .addCase(fetchSimilarMovieLists.fulfilled, (state, action) => {
        state.loading.similarLoading = false;
        state.similarMoviesData = action.payload;
      })
      .addCase(fetchSimilarMovieLists.rejected, (state, action) => {
        state.loading.similarLoading = false;
        const actions = action.error?.message;
        console.log(actions, JSON.stringify(actions));

        state.error.similarError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
            ? "/fun_movieCard.jpeg"
            : "/500.jpeg";
        console.log(state.error.similarError);
      })

      // RECOMMEND
      .addCase(fetchRecommendMovieLists.pending, (state) => {
        state.loading.recommendLoading = true;
        state.loading.recommendError = null;
        state.loading.recommendError = null;
      })
      .addCase(fetchRecommendMovieLists.fulfilled, (state, action) => {
        state.loading.recommendLoading = false;
        state.recommendMoviesData = action.payload;
      })
      .addCase(fetchRecommendMovieLists.rejected, (state, action) => {
        state.loading.recommendLoading = false;
        const actions = action.error?.message;
        state.error.recommendError =
          actions == 404
            ? "/404.jpeg"
            : actions == 502 || actions == 504
            ? "/fun_movieCard.jpeg"
            : "/500.jpeg";
      })

      // GENRES
      .addCase(getGenresAndTags.pending, (state) => {
        state.loading.genresLoading = true;
        state.loading.genresError = null;
        state.error.genresError = null;
      })
      .addCase(getGenresAndTags.fulfilled, (state, action) => {
        state.loading.genresLoading = false;
        state.movieGenresAndTagsData = action.payload;
      })
      .addCase(getGenresAndTags.rejected, (state, action) => {
        state.loading.genresLoading = false;
        const actions = action.error?.message;
        state.error.genresError =
          actions == 404
            ? "404:We looked everywhere. Even under the couch. Nothing. 🎬"
            : actions == 502 || actions == 504
            ? "Request sent. Response stuck in traffic."
            : "500: Server is having feelings. Please respect its space.";
      })

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
        const actions = action.error?.message;
        state.error.reviewsError =
          actions == 404
            ? "404:We looked everywhere. Even under the couch. Nothing. 🎬"
            : actions == 502 || actions == 504
            ? "Request sent. Response stuck in traffic."
            : "500: Server is having feelings. Please respect its space.";
      })

      //SEARCHED
      .addCase(getUserSearchedResults.pending, (state) => {
        state.loading.searchedLoading = true;
        state.error.searchedError = null;
      })
      .addCase(getUserSearchedResults.fulfilled, (state, action) => {
        state.loading.searchedLoading = false;
        state.searchedData = action.payload;
      })
      .addCase(getUserSearchedResults.rejected, (state, action) => {
        state.loading.searchedLoading = false;
        const actions = action.error?.message;
        state.error.searchedError =
          actions == 404
            ? "404:We looked everywhere. Even under the couch. Nothing. 🎬"
            : actions == 502 || actions == 504
            ? "Request sent. Response stuck in traffic."
            : "500: Server is having feelings. Please respect its space.";
      });
  },
});

export default movieSlice.reducer;
