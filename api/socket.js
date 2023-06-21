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
      const newMessages = new Messages(messages);
      await newMessages.save();
    });

    Messages.watch().on("change", async () => {
      const data = await Messages.find();
      socket.emit("render", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

module.exports = socketHandler;
