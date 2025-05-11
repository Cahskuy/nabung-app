import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

redis
  .ping()
  .then((res) => {
    console.log("✅ Redis connected:", res); // output: "PONG"
  })
  .catch((err) => {
    console.error("❌ Redis connection failed:", err);
  });

export default redis;
