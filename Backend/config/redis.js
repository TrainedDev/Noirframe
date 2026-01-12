import { createClient } from 'redis';
import {config} from "dotenv"

config();

const { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT} = process.env;
const redisClient = createClient({
    username: 'default',
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Connected Successfully'));

export async function connectRedis(){
    if(!redisClient.isOpen){
        await redisClient.connect();
    }
}

export default redisClient;

