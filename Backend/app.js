import express from "express";
import cors from "cors"
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler } from "./middlewere/handlers.js";
import { connectRedis } from "./config/redis.js";

const app = express();

connectRedis();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/movies",  movieRoutes)
app.get("/", (req, res) => res.send("server is live"));
app.use(errorHandler);

export default app;