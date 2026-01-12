import { Router } from "express";
import {
  fetchGenresAndTags,
  fetchMovieData,
  fetchMovieRecommends,
  fetchMovieReviews,
  fetchSimilarMovie,
  fetchUserSearchedMedia,
  nowPlayingMovie,
  popularMovies,
  thisWeekTrendingMovies,
  topRatedMovies,
  upComingMovies,
  userCustomMovieLists,
} from "../controller/controller.js";
import { asyncHandlers } from "../middlewere/handlers.js";

const route = Router();

route.get("/now_playing", asyncHandlers(nowPlayingMovie));
route.get("/movie_page/:id", asyncHandlers(fetchMovieData));
route.get("/popular", asyncHandlers(popularMovies));
route.get("/top_rated", asyncHandlers(topRatedMovies));
route.get("/trending", asyncHandlers(thisWeekTrendingMovies));
route.get("/upcoming", asyncHandlers(upComingMovies));
route.get("/recommendation/:id", asyncHandlers(fetchMovieRecommends));
route.get("/similar/:id", asyncHandlers(fetchSimilarMovie));
route.get("/genre_keywords", asyncHandlers(fetchGenresAndTags));
route.get("/reviews/:id", asyncHandlers(fetchMovieReviews));
route.get("/filter/list", asyncHandlers(userCustomMovieLists));
route.get("/search/media", asyncHandlers(fetchUserSearchedMedia));

export default route;
