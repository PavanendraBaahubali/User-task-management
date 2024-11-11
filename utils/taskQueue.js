const Queue = require("bull");
const { taskHandler } = require("../controller/taskController");
const taskQueue = new Queue("taskQueue");

taskQueue.process(async (job) => {
  console.log("task queue is called..");
  const user = job.data.user;
  console.log(`Processing job for user: ${user}`);
  await taskHandler(user);
});

module.exports = taskQueue;
