const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  // Enable any url to acsses
  cors: { origin: "*" },
});

const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("join", (userId) => {
    activeUsers.set(userId, socket.id);
    console.log(`User ${userId} joined`);
  });

  socket.on("chat message", ({ senderId, receiverId, message }) => {
    console.log(`${senderId} says ${message} to ${receiverId}`);
    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      socket.to(receiverSocketId).emit("chat message", { senderId, message });
    }
  });

  socket.on("disconnect", () => {
    const disconnectedUser = getKeyByValue(activeUsers, socket.id);
    if (disconnectedUser) {
      activeUsers.delete(disconnectedUser);
      console.log(`User ${disconnectedUser} disconnected`);
    }
  });
});

http.listen(8080, () => console.log("listening...."));

function getKeyByValue(map, value) {
  for (const [key, val] of map.entries()) {
    if (val === value) {
      return key;
    }
  }
  return null;
}
