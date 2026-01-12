import axios from "axios";

const api = import.meta.env.VITE_BACKEND_URL;

export const nowPlayingMovie = async () => {
  try {
    const response = await axios.get(`${api}/movies/now_playing`);

    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("failed to get now playing movies", data);
    throw new Error(status.toString());
  }
};

export const fetchMoviePage = async (id) => {
  try {
    const response = await axios.get(`${api}/movies/movie_page/${id}`);

    return response.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch movie page", data);
    throw new Error(status.toString());
  }
};

export const thisWeekTrendingMovies = async () => {
  try {
    const response = await axios.get(`${api}/movies/trending`);

    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch this week trending movie", data);
    throw new Error(status.toString());
  }
};

export const topRatedMovies = async () => {
  try {
    const response = await axios.get(`${api}/movies/top_rated`);
    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch top rated movie", data);
    throw new Error(status.toString());
  }
};

export const popularMovies = async () => {
  try {
    const response = await axios.get(`${api}/movies/popular`);
    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch popular movie", data);
    throw new Error(status.toString());
  }
};

export const upComingMovies = async () => {
  try {
    const response = await axios.get(`${api}/movies/upcoming`);
    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch upcoming movie", data);
    throw new Error(status.toString());
  }
};

export const recommendMovies = async (id) => {
  try {
    const response = await axios.get(`${api}/movies/recommendation/${id}`);

    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch recommend movie", data);
    throw new Error(status.toString());
  }
};

export const similarMovies = async (id) => {
  try {
    const response = await axios.get(`${api}/movies/similar/${id}`);

    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch similar movie", data);
    throw new Error(status.toString());
  }
};

export const fetchGenreAndTags = async () => {
  try {
    const response = await axios.get(`${api}/movies/genre_keywords`);

    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch movie genres and tags", data);
    throw new Error(status.toString());
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(`${api}/movies/reviews/${id}`);
    // console.log(response.data);

    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch movie reviews", data);
    throw new Error(status.toString());
  }
};

export const fetchFilteredMovieList = async (data) => {
  try {
    const {
      genres,
      tags,
      yearGte,
      sortBy,
      yearLte,
      runtimeGte,
      runtimeLte,
      movieListName,
    } = data;

    const response = await axios.get(`${api}/movies/filter/list`, {
      params: {
        ...(genres?.length && { genres: genres.join("|") }),
        ...(tags?.length && { tags: tags.join(",") }),
        yearGte,
        yearLte,
        sortBy,
        runtimeGte,
        runtimeLte,
        vote_count_gte:
          movieListName === "trending"
            ? 50
            : movieListName === "popularMovies"
            ? 200
            : movieListName === "topRated"
            ? 1000
            : 0,
        vote_average_gte:
          movieListName === "topRated"
            ? 7.5
            : movieListName === "popularMovies"
            ? 6
            : 0,
      },
    });

    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch filter movie", data);
    throw new Error(status.toString());
  }
};

export const fetchUserSearchMedia = async (name) => {

  try {
    const response = await axios.get(`${api}/movies/search/media`, {
      params: {
        name,
      },
    });

    return response.data.data;
  } catch (error) {
    const { data, status } = error.response;
    console.log("Failed to fetch searched media", data);
    throw new Error(status.toString());
  }
};
