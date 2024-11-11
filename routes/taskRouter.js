const express = require("express");
const { rateLimitMiddleWare } = require("../middlewares/rateLimitMiddleWare");
const { taskController } = require("../controller/taskController");

const taskRouter = () => {
  const router = express.Router();
  try {
    router.post("/task", (req, res) => taskController(req, res));
  } catch (err) {
    console.log(err);
  }

  return router;
};

module.exports = taskRouter;
