const WebSocket = require("ws");
const { sendMessageToClients } = require("./serverSocket");


const binanceSocket = new WebSocket(process.env.BINANCE_WS);

binanceSocket.on("open", () => {
  console.log("Connected to Binance WebSocket");
});

binanceSocket.on("message", (data) => {
  // Handle messages received from Binance WebSocket here
  // console.log("Received message from Binance WebSocket:");

  // You can parse and process the data as needed
  try {
    const message = JSON.parse(data);
    sendMessageToClients(message);
    // Example: Check if it's a ticker price update message
    // if (message.method === "ticker.price") {
    //   // Process the ticker data
    //   console.log("Ticker data:", message.params);
    // }
  } catch (error) {
    console.error("Error parsing message:", error);
  }
});

const sendMessageToBinance = (message) => {
  try {
    console.log(WebSocket.OPEN);
    // Ensure that the WebSocket is open before sending the message
    if (binanceSocket.readyState === WebSocket.OPEN) {
      binanceSocket.send(JSON.stringify(message));
      // console.log("Message sent to Binance WebSocket:", message);
    } else {
      console.error("WebSocket is not open. Message not sent.");
    }
  } catch (error) {
    console.error("Error sending message to Binance WebSocket:", error);
  }
};

module.exports = { binanceSocket, sendMessageToBinance };
