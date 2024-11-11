const getFormatedDate = require("../utils/getFormatedDate");
const taskQueue = require("../utils/taskQueue");

const taskController = async (req, res) => {
  console.log("called controller");
  const { userId } = req.body;
  try {
    const job = await taskQueue.add({ user: userId });
    await job.finished();
    const formated = getFormatedDate();
    res.status(200).json({
      message: `${userId} task completed at ${formated}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    console.error(err);
  }
};

module.exports = taskController;
