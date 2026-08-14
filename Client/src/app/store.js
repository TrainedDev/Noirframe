import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "@/features/movie/movieSlice";
import movieDetailsReducer from "@/features/movieDetails/movieDetailsSlice";
import movieReviewReducer from "@/features/review/reviewSlice";
import searchedMovieReducer from "@/features/searchedMovie/searchedMovieSlice";
import filterMovieReducer from "@/features/specificFilteredMoviesList/specificFilteredMoviesListSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    movieDetails: movieDetailsReducer,
    review: movieReviewReducer,
    searched: searchedMovieReducer,
    filterMovie: filterMovieReducer,
  },
});

export default store;
