import axios from "axios";
import { config } from "dotenv";
import { appError } from "../utils/helperFunc.js";

config();

const { BASE_URL, ACCESS_TOKEN } = process.env;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20_000, // 10s - fail fast instead of hanging forever
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      throw appError("TMDB request timed out", 504);
    }

    throw appError("TMDB unreachable", 502);
  }
);
export default axiosInstance;
