const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = 4000;
app.use(cors());
let users = [];

const socketIO = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.83:3000"],
    // origin: ["http://localhost:3000"],
  },
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} 用户已连接!`);

  // 监听和在控制台打印消息
  socket.on("message", (data) => {
    console.log(data, "dddd");
    socketIO.emit("messageResponse", data);
  });

  // 监听房间
  // socket.on("createRoom")

  socket.on("typing", (data) => {
    console.log(data, "data");
    socket.broadcast.emit("typingResponse", data);
  });

  // 监听新用户的加入
  socket.on("newUser", (data) => {
    // 添加新用户到 users 中
    users.push(data);
    console.log(users);

    // 发送用户列表到客户端
    socketIO.emit("newUserResponse", users);
  });

  socket.on("base64file", (msg) => {
    console.log(msg, "msg");
    // socketIO.emit("base64fileRes", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔥: 一个用户已断开连接");
    // 当用户下线的时候更新用户列表
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);

    // 发送用户列表到客户端
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });

  socket.on("upload", (file, callback) => {
    console.log(file); // <Buffer 25 50 44 ...>
    // save the content to the disk, for example
    // writeFile("/tmp/upload", file, (err) => {
    //   callback({ message: err ? "failure" : "success" });
    // });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
