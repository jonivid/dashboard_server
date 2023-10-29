const router = require("express").Router();
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const { sendMessageToBinance } = require("../utils/binanceSocket");

let intervalId;
router.get("/start", async (req, res, next) => {
  try {
    if (!intervalId) {
      const messageToBinance = {
        id: uuidv1(),
        method: "ticker.price",
        params: {
          symbol: "BTCUSDT",
        },
      };
      intervalId = setInterval(() => {
        sendMessageToBinance(messageToBinance);
      }, 1000); // Send every 1 second
      res.send("Sending messages to Binance started.");
    } else {
      res.send("Sending messages to Binance is already started.");
    }
  } catch (error) {
    return next(error);
  }
});
router.get("/stop", (req, res) => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    res.send("Sending messages to Binance stopped.");
  } else {
    res.send("Sending messages to Binance is not running.");
  }
});
module.exports = router;
