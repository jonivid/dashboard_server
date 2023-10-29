require("dotenv").config();
const binanceController = require("./controllers/binance-controller");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const WebSocket = require("ws");
const http = require("http");
const createWebSocketConnection = require("./utils/binanceSocket");
const { initializeSocket } = require("./utils/serverSocket");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = initializeSocket(server);

app.use("/binance", binanceController);

app.listen(process.env.REST_PORT, () =>
  console.log("Rest Api server is running "),
);
server.listen(process.env.WS_PORT, () =>
  console.log("Connected to local WebSocket"),
);
