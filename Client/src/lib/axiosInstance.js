import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) =>{
    return response.data.data;
  },
  (err) => {
    throw err;
  },
);
