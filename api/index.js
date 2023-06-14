const express = require("express");
const cors = require("cors");
const socketHandler = require("./socket.js");

const app = express();
app.use(cors());

const http = require("http").Server(app);

const mongoose = require("mongoose");

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

socketHandler(http);

http.listen(5000, () => {
  connect();
  console.log(`Example app listening on port 5000`);
});
