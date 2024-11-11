**_User Task Queuing with Rate Limiting_**

# Overview

### Purpose

This service processes user tasks in a queue with rate limiting to handle high traffic. API rate limiting restricts user requests, allowing a user to make:

- 1 request per second
- 20 requests per minute

If the rate limit is exceeded, those requests are queued into the `taskQueue`. These requests are processed after all the previous tasks in the queue are completed.

### Features

- Rate limiting
- Queuing tasks with Bull
- Unique user job IDs
- Task-handling techniques like debouncing or deduplication

# Setup and Installation Guide

# Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v12 or higher recommended)
- **npm** (Node package manager, usually comes with Node.js)
- **Redis** (In-memory data store for caching and task queuing)

## Dependencies

Below is a list of key dependencies used in the project:

````json
"dependencies": {
  "bull": "^4.16.4",
  "dotenv": "^16.4.5",
  "express": "^4.21.1",
  "rate-limit-redis": "^4.2.0",
  "rate-limiter-flexible": "^5.0.4",
  "redis": "^4.7.0"
}
### Description of Dependencies ###
    - bull: Used for queuing user tasks.
    - dotenv: Manages environment variables.
    - express: Provides routing functionality for building web applications.
    - rate-limit-redis, rate-limiter-flexible: Used for Redis-based rate limiting, tracking how      frequently a user hits the routes.
    - redis: Manages data caching.

## Redis Installation for Windows
    For Redis installation on Windows, you can download the Redis Windows package from https://github.com/microsoftarchive/redis/releases.
    Start the Redis server before starting your application server.


Here's a more structured and cleaner version of your provided content formatted in GitHub markdown:

markdown
Copy code
# Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v12 or higher recommended)
- **npm** (Node package manager, usually comes with Node.js)
- **Redis** (In-memory data store for caching and task queuing)

## Dependencies

Below is a list of key dependencies used in the project:

```json
"dependencies": {
  "bull": "^4.16.4",
  "dotenv": "^16.4.5",
  "express": "^4.21.1",
  "rate-limit-redis": "^4.2.0",
  "rate-limiter-flexible": "^5.0.4",
  "redis": "^4.7.0"
}

## Description of Dependencies

bull: Used for queuing user tasks.
dotenv: Manages environment variables.
express: Provides routing functionality for building web applications.
rate-limit-redis, rate-limiter-flexible: Used for Redis-based rate limiting, tracking how frequently a user hits the routes.
redis: Manages data caching.
Redis Installation for Windows
For Redis installation on Windows, you can download the Redis Windows package from https://github.com/microsoftarchive/redis/releases.

Start the Redis server before starting your application server.
Redis Server Setup
To create a Redis client, use the following code:

const Redis = require("redis");
require("dotenv").config();

const redisPort = process.env.REDISPORT || 6379;

// Create Redis client using the new format for redis@4.x
// const redisClient = Redis.createClient({
//   url: `redis://localhost:${redisPort}`, // Use the URL format to specify connection
// });

// redisClient.on("connect", () => {
//   console.log("Connected to Redis server.");
// });

// redisClient.on("error", (err) => {
//   console.error("Redis error:", err);
// });

// module.exports = redisClient;
````
