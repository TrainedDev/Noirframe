import { axiosInstance } from "@/lib/axiosInstance";


export const fetchMovieReviews = async (id) =>
  await axiosInstance.get(`/movies/reviews/${id}`);
