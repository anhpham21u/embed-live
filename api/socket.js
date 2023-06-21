const Messages = require("./models/Messages");

function socketHandler(http) {
  const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("render", async () => {
      const data = await Messages.find();
      socket.emit("render", data);
    });

    socket.on("messages", async (messages) => {
      console.log("Message received:", messages);

      // CREATE DATA
      const newMessages = new Messages(messages);
      await newMessages.save();
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

module.exports = socketHandler;
