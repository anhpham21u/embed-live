const Messages = require("./models/Messages");

function socketHandler(http) {
  const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("render", () => {
      Messages.findById("6483912fcc7c8e5591b170fd").then((data) => {
        socket.emit("render", data.content);
      });
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
}

module.exports = socketHandler;
