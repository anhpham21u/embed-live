const express = require("express");
const cors = require("cors");
const socketHandler = require("./socket.js");
const authRoute = require("./routes/auth.js");
// const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

const http = require("http").Server(app);

const mongoose = require("mongoose");
const { constrainedMemory } = require("process");

// connnect to mongodb
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

// solve socket io
socketHandler(http);

// const apiProxy = createProxyMiddleware("/api", {
//   target: "http://localhost:3000", // Địa chỉ của máy chủ thật
//   changeOrigin: true,
// });

// middlewares
// app.use("/api", apiProxy);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Some thing went wrong!!!";

  return res.status(errorStatus).json({
    sucess: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// app.listen(8000, () => {
//   console.log("Listen port 8000");
// });

http.listen(5000, () => {
  connect();
  console.log(`Example app listening on port 5000`);
});
