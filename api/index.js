const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = 5000;

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", async (message) => {
    console.log("Message received:", message);
  });
});

http.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
