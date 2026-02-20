const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;

    console.log(`User ${socket.id} joined room ${roomId}`);

    socket.to(roomId).emit("request-video-state");
  });

  socket.on("play-video", ({ time }) => {
    socket.to(socket.roomId).emit("play-video", { time });
  });

  socket.on("pause-video", ({ time }) => {
    socket.to(socket.roomId).emit("pause-video", { time });
  });

  socket.on("seek-video", ({ time }) => {
    socket.to(socket.roomId).emit("seek-video", { time });
  });

  socket.on("send-video-state", ({ roomId, time, isPlaying }) => {
    socket.to(roomId).emit("sync-video-state", {
      time,
      isPlaying,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Socket server running on port 5000");
});
