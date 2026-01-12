import axiosInstance from "../lib/axios.js";
import { appError, setMovieTrailer } from "../utils/helperFunc.js";

// now playing movie service
export const nowPlayingMovieService = async () => {
  const response = await axiosInstance("/movie/now_playing");
  const data = response?.data?.results;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("Response is empty", 404);

  return data;
};

// genres service
export const genreService = async () => {
  const response = await axiosInstance.get(`/genre/movie/list`);
  const data = response?.data?.genres;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("response is empty", 404);

  return data;
};

// movie details service
export const fetchMovieDetails = async (id) => {
  if (!id) throw appError("movie id not found", 400);

  const movieTags = await fetchMovieTags(id);
  const moviesData = await axiosInstance.get(`/movie/${id}`);
  const movieTrailerData = await axiosInstance.get(`/movie/${id}/videos`);

  if (!moviesData.data || !Array.isArray(movieTrailerData.data?.results)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }

  const trailerData = setMovieTrailer(movieTrailerData.data.results);

  return { moviesData: moviesData.data, movieTags, trailerData };
};

// user choose tags service
export const fetchKeyWords = async (tagsArr) => {
  const arr = [];

  if (!Array.isArray(tagsArr) || tagsArr.length === 0)
    throw appError("no tags found", 400);

  for (const ele of tagsArr) {
    const tagsIds = await axiosInstance.get("/search/keyword", {
      params: {
        query: ele,
      },
    });
    tagsIds.data?.results.forEach((ele) => arr.push(ele.id));
  }
  return arr;
};

// movie tags service
const fetchMovieTags = async (id) => {
  if (!id) throw appError("movie id not found", 400);

  const response = await axiosInstance.get(`movie/${id}/keywords`);
  const data = response?.data?.keywords;

  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  return data;
};

// popular movie service
export const fetchPopularMovies = async () => {
  const response = await axiosInstance("/movie/popular");
  const data = response.data?.results;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("Response is empty", 404);

  return data;
};

// top rated movie service
export const fetchTopRatedMovies = async () => {
  const response = await axiosInstance("/movie/top_rated");
  const data = response.data?.results;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("Response is empty", 404);

  return data;
};

// trending movie service
export const fetchTrendingMovies = async () => {
  const response = await axiosInstance("/trending/movie/week");
  const data = response.data?.results;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("Response is empty", 404);

  return data;
};

// upComing movie service
export const fetchUpComingMovies = async () => {
  const response = await axiosInstance("/movie/upcoming");
  const data = response.data?.results;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("Response is empty", 404);

  return data;
};

// recommend movie service
export const fetchRecommendedMovies = async (movieId) => {
  if (!movieId) throw appError("movie id not found", 400);

  const response = await axiosInstance.get(`/movie/${movieId}/recommendations`);
  const data = response?.data?.results;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("Response is empty", 404);

  return data;
};

// similar movie service
export const fetchSimilarMoviesData = async (movieId) => {
  if (!movieId) throw appError("movie id not found", 400);
  const response = await axiosInstance.get(`/movie/${movieId}/similar`);
  const data = response?.data?.results;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("Response is empty", 404);

  return data;
};

// filter movie service
export const fetchFilteredMovies = async (paramsObj) => {
  const response = await axiosInstance.get(`/discover/movie`, {
    params: paramsObj,
  });
  const data = response?.data?.results;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("Response is empty", 404);

  return data;
};

// review service
export const movieReviewsService = async (id) => {
  if (!id) throw appError("movie id not found", 400);

  const response = await axiosInstance.get(`/movie/${id}/reviews`);
  const data = response?.data?.results;

  if (!Array.isArray(data)) {
    throw appError("Invalid TMDB recommendations response", 502);
  }
  if (data.length === 0) throw appError("Response is empty", 404);

  return data;
};

// fetch user searched media
export const userSearchedService = async (query) => {
  if (!query) appError("required searched data not found", 400);

  const response = await axiosInstance.get("/search/multi", {
    params: {
      query,
    }
  });
  const data = response?.data?.results;
  
  if (!Array.isArray(data)) {
    throw appError("Invalid searched result", 502);
  }

  return data;
};
