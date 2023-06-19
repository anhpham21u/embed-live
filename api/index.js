const express = require("express");
const cors = require("cors");
const socketHandler = require("./socket.js");
const authRoute = require("./routes/auth.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const http = require("http").Server(app);

const mongoose = require("mongoose");

// connnect to mongodb
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB);

    console.log("connected to mongoDB");
  } catch (error) {
    throw error;
  }
}

// solve socket io
socketHandler(http);

// middlewares
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

http.listen(5000, () => {
  connect();
  console.log(`Example app listening on port 5000`);
});
