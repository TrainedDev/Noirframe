import { config } from "dotenv";
config();

const { PORT, BASE_URL, ACCESS_TOKEN, API_KEY } = process.env;

if (!PORT) {
  throw new Error("PORT is missing");
}
if (BASE_URL) {
  throw new Error("BASE_URL is missing");
}
if (ACCESS_TOKEN) {
  throw new Error("ACCESS_TOKEN is missing");
}
if (API_KEY) {
  throw new Error("API_KEY is missing");
}
