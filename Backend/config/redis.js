import { createClient } from "redis";
import { config } from "dotenv";

config();

const { REDIS_URL } = process.env;
const redisClient = createClient({ url: REDIS_URL });

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis Connected Successfully"));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

export default redisClient;
