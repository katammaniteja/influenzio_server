const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const Message = require("./models/messageSchema");
const server = http.createServer(app);

// Securing the sensitive information
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(express.json());
app.use(require("./routers/auth"));
app.use(require("./routers/about"));
app.use(require("./routers/influencers"));
app.use(require("./routers/chat"));

server.listen(5000);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    const message = new Message(msg);
    message.save();
    socket.broadcast.emit("message", msg);
  });
});
