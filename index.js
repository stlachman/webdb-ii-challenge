const express = require("express");
const helmet = require("helmet");

const server = express();

const zooRouter = require("./zoo/zoo-routes.js");
const bearRouter = require("./bears/bear-routes.js");

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Everyone" });
});

server.use("/api/zoos", zooRouter);
server.use("/api/bears", bearRouter);

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
