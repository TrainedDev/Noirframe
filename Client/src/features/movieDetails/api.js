import { axiosInstance } from "@/lib/axiosInstance";

export const upComingMovies = async () =>
  await axiosInstance.get(`/movies/upcoming`);

export const recommendMovies = async (id) =>
  await axiosInstance.get(`/movies/recommendation/${id}`);

export const similarMovies = async (id) =>
  await axiosInstance.get(`/movies/similar/${id}`);

export const fetchMoviePage = async (id) =>
  await axiosInstance.get(`/movies/movie_page/${id}`);
