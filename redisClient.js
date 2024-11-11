const Redis = require("redis");
require("dotenv").config();

const redisPort = process.env.REDISPORT || 6379;

// Create Redis client using the new format for redis@4.x
const redisClient = Redis.createClient({
  url: `redis://localhost:${redisPort}`, // Use the URL format to specify connection
});

redisClient.on("connect", () => {
  console.log("Connected to Redis server.");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redisClient;
