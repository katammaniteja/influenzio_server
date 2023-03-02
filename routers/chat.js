const express = require("express");
const router = express.Router();
const Message = require("./../models/messageSchema");

router.post("/chat", async (req, res) => {
  try {
    const { sender, data, receiver } = req.body;
    const message = new Message({ sender, data, receiver });
    await message.save();
    res.status(201).json("Message send successfully");
  } catch (error) {
    console.log(error);
  }
});

router.post("/getChat", async (req, res) => {
  const { sender, receiver } = req.body;
  const messages = await Message.find({
    $or: [
      { sender: sender, receiver: receiver },
      { receiver: sender, sender: receiver },
    ],
  });
  res.status(201).json(messages);
});

module.exports = router;
