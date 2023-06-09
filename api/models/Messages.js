const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: [String],
  },
  { timestamps: true }
);

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;
