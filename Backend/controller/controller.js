import { redisHelper } from "../Services/redisCache.js";
import {
  fetchFilteredMovies,
  fetchMovieDetails,
  fetchPopularMovies,
  fetchRecommendedMovies,
  fetchSimilarMoviesData,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpComingMovies,
  genreService,
  movieReviewsService,
  nowPlayingMovieService,
  userSearchedService,
} from "../Services/tmdbService.js";
import { createQueryParams } from "../utils/helperFunc.js";

// current movies playing on theaters
export const nowPlayingMovie = async (req, res) => {
  const response = await redisHelper("nowPlayingMovie", nowPlayingMovieService);

  res.status(200).json({ msg: "movie successfully fetched", data: response });
};

// fetch genres and tags
export const fetchGenresAndTags = async (req, res) => {
  const data = await redisHelper(`genresAndTags`, genreService);

  res.status(200).json({ msg: "genres successfully fetched", data });
};

// fetch movie detail by id
export const fetchMovieData = async (req, res) => {
  const { id } = req.params;

  const response = await redisHelper(`movieDetails:${id}`, () =>
    fetchMovieDetails(id)
  );

  res.status(200).json({
    msg: "movie details successfully fetched",
    data: response.moviesData,
    movieTags: response.movieTags,
    movieTrailer: response.trailerData,
  });
};

// fetch popular movies
export const popularMovies = async (req, res) => {
  const response = await redisHelper("popularMovies", fetchPopularMovies);
  res.status(200).json({
    msg: "popular movies successfully fetched",
    data: response,
  });
};

// fetch top-rated movies
export const topRatedMovies = async (req, res) => {
  const response = await redisHelper("topRatedMovies", fetchTopRatedMovies);
  res.status(200).json({
    msg: "top rated movies successfully fetched",
    data: response,
  });
};

// fetch this week trending movies
export const thisWeekTrendingMovies = async (req, res) => {
  const response = await redisHelper("trendingMovies", fetchTrendingMovies);

  res.status(200).json({
    msg: "this week trending movies successfully fetched",
    data: response,
  });
};

// fetch upcoming movies
export const upComingMovies = async (req, res) => {
  const response = await redisHelper("upComingMovies", fetchUpComingMovies);
  res.status(200).json({
    msg: "upcoming movies successfully fetched",
    data: response,
  });
};

// fetch movie recommendation
export const fetchMovieRecommends = async (req, res) => {
  const { id } = req.params;
  const response = await redisHelper(`recommendMovies:${id}`, () =>
    fetchRecommendedMovies(id)
  );

  res.status(200).json({
    msg: "movie recommendations successfully fetched",
    data: response,
  });
};

// fetch similar movies based on genre and keyword
export const fetchSimilarMovie = async (req, res) => {
  const { id } = req.params;

  const response = await redisHelper(`similarMovies:${id}`, () =>
    fetchSimilarMoviesData(id)
  );

  res.status(200).json({
    msg: "successfully fetched similar movies",
    data: response,
  });
};

//fetch user custom movies list
export const userCustomMovieLists = async (req, res) => {
  
  const { tmdbParamsObj, key } = await createQueryParams(
    "filteredMovies",
    req.query
  );
  const response = await redisHelper(key, () =>
    fetchFilteredMovies(tmdbParamsObj)
  );

  res.status(200).json({
    msg: "user custom movie list successfully fetched",
    data: response,
  });
};

// fetch movie reviews 
export const fetchMovieReviews = async (req, res) => {
  const { id } = req.params;
  const response = await redisHelper(`movieReview:${id}`, () =>
    movieReviewsService(id)
  );

  res
    .status(200)
    .json({ msg: "movies reviews successfully fetched", data: response });
};

// fetch user searched lists 
export const fetchUserSearchedMedia = async (req, res) => {
  const { name } = req.query;
  const response = await redisHelper(`searchedData:${name}`, () =>
    userSearchedService(name)
  );
  res
    .status(200)
    .json({ msg: "user searched data successfully fetched", data: response });
};
