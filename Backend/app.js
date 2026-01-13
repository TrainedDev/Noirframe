import express from "express";
import cors from "cors"
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler } from "./middlewere/handlers.js";
import { connectRedis } from "./config/redis.js";
import { config } from "dotenv";

config();

const app = express();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

connectRedis();

app.use(cors({
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use("/movies",  movieRoutes)
app.get("/", (req, res) => res.send("server is live"));
app.use(errorHandler);

export default app;