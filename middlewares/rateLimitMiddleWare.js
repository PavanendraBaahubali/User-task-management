const { RateLimiterRedis } = require("rate-limiter-flexible");
const taskQueue = require("../utils/taskQueue");
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
  console.log("ratelimiter");
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    await rateLimiterPerSecond.consume(userId);
    await rateLimiterPerMinute.consume(userId);
    console.log("flow forwarded to controller");
    next();
  } catch (err) {
    console.log("limit exceeds", err);
    try {
      const job = await taskQueue.add({ user: userId });
      await job.finished();
      res.status(200).json({ message: "Message enqueued and and processed." });
      return;
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = { rateLimitMiddleWare };
