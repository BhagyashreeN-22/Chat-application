import redis from "redis"

const redisClient = redis(
    url = process.env.REDIS_URL ||"redis://localhost:6379"
);

redisClient.on("connect",()=>{
    console.log("Successful connection to redis")
});

redisClient.on("error",()=>{
    console.log("Failed to connect to redis")
});

const connectRedis =async ()=>{
  await redisClient.connect();
}

export {redisClient,connectRedis}