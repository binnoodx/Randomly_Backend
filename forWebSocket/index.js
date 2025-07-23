const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // ✅ CORRECT ORIGIN
    methods: ["GET", "POST"]
  }
});


let users = [];

io.on("connection", (socket) => {

  socket.on("newUser", (email) => {
    
    const exists = users.some((user) => user.email === email);
    
    if (!exists && email) {
      console.log("📥 New user:", email)
      users.push({ socketId: socket.id, email })
    }

    // Send Only Email to Frontend
    const emailList = users.map(u => u.email);
    io.emit("sendUserArray", emailList);
  });
  
  socket.on("disconnect", () => {
    
    users = users.filter((user) => user.socketId !== socket.id);
    const emailList = users.map(u => u.email);
    io.emit("sendUserArray", emailList)
  });
});

server.listen(8000, () => console.log("🚀 Server running on port 8000"));

