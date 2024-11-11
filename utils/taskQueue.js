const Queue = require("bull");
const taskLogs = require("./taskLogs");
const getFormatedDate = require("./getFormatedDate");
const redisClient = require("../redisClient");
const taskQueue = new Queue("taskQueue");

const taskHandler = async (user) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      console.log(`Task processed for user: ${user}`);
      const log = {};
      log[user] = `${user} task completed at ${getFormatedDate()}`;

      taskLogs.push(log);

      //   Optional
      await redisClient.set(user, "okay");

      resolve();
    }, 1000);
  });
};

// Define the queue processing logic once
taskQueue.process(async (job) => {
  const user = job.data.user;
  console.log(`Processing job for user: ${user}`);
  await taskHandler(user);
  console.log(taskLogs);
});

module.exports = taskQueue;
