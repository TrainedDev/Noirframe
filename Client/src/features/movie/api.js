import { axiosInstance } from "@/lib/axiosInstance";

export const nowPlayingMovie = async () =>
  await axiosInstance.get(`/movies/now_playing`);

export const fetchMoviePage = async (id) =>
  await axiosInstance.get(`/movies/movie_page/${id}`);

export const thisWeekTrendingMovies = async () =>
  await axiosInstance.get(`/movies/trending`);

export const topRatedMovies = async () =>
  await axiosInstance.get(`/movies/top_rated`);

export const popularMovies = async () =>
  await axiosInstance.get(`/movies/popular`);

export const upComingMovies = async () =>
  await axiosInstance.get(`/movies/upcoming`);
