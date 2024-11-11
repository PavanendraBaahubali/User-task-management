const { RateLimiterRedis } = require("rate-limiter-flexible");

const redisClient = require("../redisClient");

const rateLimiterPerSecond = new RateLimiterRedis({
  storeClient: redisClient,
  points: 1,
  duration: 1,
  keyPrefix: "rateLimiterSec",
});

const rateLimiterPerMinute = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20,
  duration: 60,
  keyPrefix: "rateLimiterMin",
});

const rateLimitMiddleWare = async (req, res, next) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // If we've already computed the value, just return it.
    const cacheRes = await redisClient.get(userId);
    console.log(cacheRes);

    // 2. If not cached, perform the rate limit check
    await rateLimiterPerSecond.consume(userId);
    await rateLimiterPerMinute.consume(userId);

    next();
  } catch (err) {
    next();
  }
};

module.exports = { rateLimitMiddleWare };
