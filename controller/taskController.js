const getFormatedDate = require("../utils/getFormatedDate");
const taskLogs = require("../utils/taskLogs");

const taskHandler = async (user) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      console.log(`Task processed for user: ${user}`);
      const log = {};
      log[user] = `${user} task completed at ${getFormatedDate()}`;

      taskLogs.push(log);

      resolve();
    }, 1000);
  });
};

const taskController = async (req, res) => {
  console.log("called controller");
  const { userId } = req.body;
  try {
    await taskHandler(userId);

    console.log("controller called and sucsess");

    const formated = getFormatedDate();
    return res.status(200).json({
      message: `${userId} task completed at ${formated}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { taskController, taskHandler };
