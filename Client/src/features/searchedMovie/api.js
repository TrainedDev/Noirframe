import { axiosInstance } from "@/lib/axiosInstance";

export const fetchUserSearchMedia = async (name) =>
  await axiosInstance.get(`/movies/search/media`, {
    params: {
      name,
    },
  });
