const { RateLimiterRedis } = require("rate-limiter-flexible");
const taskQueue = require("../utils/taskQueue");
const redisClient = require("../redisClient");
const getFormatedDate = require("../utils/getFormatedDate");

// const rateLimiterPerSecond = new RateLimiterRedis({
//   storeClient: redisClient,
//   points: 1,
//   duration: 1,
//   keyPrefix: "secLimit",
// });

const rateLimiterPerMinute = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20,
  duration: 60,
  keyPrefix: "minLimit",
});

const rateLimiterPerSecond = new RateLimiterRedis({
  storeClient: redisClient,
  points: 1,
  duration: 60, // Longer duration to keep the key alive for testing
  keyPrefix: "rateLimiterTest",
});

const rateLimitMiddleWare = async (req, res, next) => {
  const { userId } = req.body;
  console.log("Rate limiter middleware triggered");
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Rate limit checks
    const resultPerSecond = await rateLimiterPerSecond.consume(userId);
    const resultPerMinute = await rateLimiterPerMinute.consume(userId);

    console.log("result per seconde", resultPerSecond);
    if (
      resultPerSecond.remainingPoints < 0 ||
      resultPerMinute.remainingPoints < 0
    ) {
      throw new Error("Rate limit exceeded");
    }

    console.log("Request passed rate limits, forwarding to controller");
    next();
  } catch (err) {
    // Rate limit exceeded
    console.log("Rate limit exceeded", err);
    try {
      const job = await taskQueue.add({ user: userId });
      await job.finished();
      const formated = getFormatedDate();

      return res.status(429).json({
        message: `Rate limit exceeded, request enqueued and processed. ${userId} task completed at ${formated}`,
      });
    } catch (e) {
      console.log("Error processing queued task", e);
      res
        .status(500)
        .json({ message: "Internal server error while processing request." });
    }
  }
};

module.exports = { rateLimitMiddleWare };
