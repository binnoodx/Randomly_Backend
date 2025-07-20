1. Initialize the project by :

```const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "http://localhost:3000", // your frontend
  methods: ["GET", "POST"],
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
```

2. 