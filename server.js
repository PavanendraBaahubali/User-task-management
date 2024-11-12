const express = require("express");
const taskRouter = require("./routes/taskRouter");
const redisClient = require("./redisClient");
const { rateLimitMiddleWare } = require("./middlewares/rateLimitMiddleWare");

require("dotenv").config();

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    await redisClient.connect();

    app.use(rateLimitMiddleWare);

    app.use("/api/v1", taskRouter());
    app.listen(process.env.PORT || 3010, () =>
      console.log(`server running on port ${process.env.PORT || 3010} `)
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
