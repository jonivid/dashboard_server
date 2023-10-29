const { Server } = require("socket.io");
let io = null;
const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected");

    // Handle WebSocket events here

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });

  return io;
};

const sendMessageToClients = (message) => {
  if (io !== null) {
    io.emit("serverMessage", JSON.stringify(message)); // Emit the message to all clients
  } else {
    console.error("Socket.io is not properly initialized. Message not sent.");
  }
};

module.exports = { initializeSocket, sendMessageToClients };
