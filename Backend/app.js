import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler } from "./utils/handlers.js";
import { connectRedis } from "./config/redis.js";
import { config } from "dotenv";

config();

const app = express();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

app.use(
  cors({
    origin: [CLIENT_ORIGIN, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

connectRedis();

app.use(express.json());
app.use("/movies", movieRoutes);
app.get("/", (req, res) => res.send("server is live"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.use(errorHandler);

export default app;
