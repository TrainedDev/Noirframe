import redisClient from "../config/redis.js";
import { config } from "dotenv";

config();

const { DEFAULT_EXP } = process.env;

export const redisHelper = async (key, cb) => {
//   await redisClient.flushDb();
//   console.log("success clear");
  
// return
  const cachedData = await redisClient.get(key);
  
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const freshData = await cb();

  await redisClient.setEx(key, DEFAULT_EXP, JSON.stringify(freshData));

  return freshData;
};
