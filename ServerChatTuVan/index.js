const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3003"], // Thay đổi nếu frontend chạy ở port khác
    methods: ["GET", "POST"]
  }
});

let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Nhận userId để lưu trữ mapping
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("Current online users:", onlineUsers);
  });

  // Nhận tin nhắn và gửi cho người nhận nếu online
  socket.on("sendMessage", ({ senderId, receiverId, text, img }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    const message = {
      senderId,
      text,
      img,
      createdAt: new Date(),
    };

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", message);
    }
  });

  // Ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let [userId, sockId] of onlineUsers) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

server.listen(5000, () => {
  console.log("Socket.IO server running on port 5000");
});
