const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "about" },
    data: { type: String },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "about" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
