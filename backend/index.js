import express from "express";
import bodyParser from "body-parser";
import { userRouter, mailRouter } from "./routers/index.js";
import http from "http";
import { Server } from "socket.io";
import jwt, { verify } from "jsonwebtoken";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 5000;

// enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow requests from any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // add Authorization header here
  ); // allow the headers that the client sends
  next();
});

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/mail", mailRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

// Middleware to authenticate the token before connecting to Socket.IO
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  // Perform token verification here
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // socket.emit("connect_error", "Invalid token");
        return next(new Error("Invalid token"));
      } else {
        console.log("decoded", decoded);
        socket.userId = decoded;
        return next();
      }
    });
  } else {
    // socket.emit("connect_error", "Authentication token missing");
    return next(new Error("Authentication token missing"));
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
