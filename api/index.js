const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const mongoose = require("mongoose");
const Messages = require("./models/Messages");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://anhpham:anhphamliveapp@live-app.8nac9go.mongodb.net/messages?retryWrites=true&w=majority"
    );

    console.log("connected to mongoDB");
  } catch (error) {
    throw error;
  }
}

io.on("connection", (socket) => {
  console.log("A user connected");

  Messages.findById("6483912fcc7c8e5591b170fd").then((data) => {
    socket.emit("render", data.content);
  });

  socket.on("messages", async (messages) => {
    console.log("Message received:", messages);

    // CREATE DATA
    // const newMessages = new Messages({
    //   content: messages.content,
    // });
    // await newMessages.save();

    // UPDATE
    await Messages.findByIdAndUpdate(
      "6483912fcc7c8e5591b170fd",
      { $set: messages },
      { new: true }
    );
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(5000, () => {
  connect();
  console.log(`Example app listening on port 5000`);
});
