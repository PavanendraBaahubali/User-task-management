const express = require("express");
const { rateLimitMiddleWare } = require("../middlewares/rateLimitMiddleWare");
const taskController = require("../controller/taskController");

const taskRouter = () => {
  const router = express.Router();
  console.log("task router");
  try {
    router.post("/task", rateLimitMiddleWare, (req, res) =>
      taskController(req, res)
    );
  } catch (err) {
    console.log(err);
  }

  return router;
};

module.exports = taskRouter;
