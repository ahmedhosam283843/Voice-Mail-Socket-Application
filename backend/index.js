import express from "express";
import bodyParser from "body-parser";
import { userRouter, mailRouter } from "./routers/index.js";
import http from "http";
import { Server } from "socket.io";
import jwt, { verify } from "jsonwebtoken";
import { getUserByEmail } from "./db/db_queries/login_queries.js";

import dotenv from "dotenv";
import { Console } from "console";
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 5000;

// Create a map to store userId with socketId
const userSocketMap = new Map();

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
        return next(new Error("Invalid token"));
      } else {
        socket.user = {
          id: decoded, // Extract the user ID from the decoded token and assign it to socket.user.id
          // Other user properties if available
        };

        return next();
      }
    });
  } else {
    return next(new Error("Authentication token missing"));
  }
});

io.on("connection", (socket) => {
  // Extract the user ID from the authenticated socket
  const userId = socket.user.id;
  console.log(`User ${userId} Connected`);

  // Emit the userId to the client
  socket.emit("userConnected", { userId });

  // Store the userId with the socketId in the map
  userSocketMap.set(userId, socket.id);


  // Handle mail events
  socket.on("sendMail", async (data) => {
    // Implement sending mail logic here
    // Example: You can save the mail to a database or perform other actions
    // console.log(`User ${userId} is sending a mail:`, data);
    const receiver_mail = data.to;

    const receiver = await getUserByEmail(receiver_mail);
    const receiver_id = receiver.user_id.toString();

        // Emit a "receive" event to the client with the receiver_id
        const receiverSocketId = userSocketMap.get(receiver_id);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("mailReceived", { message: "Mail received" , data: data });
        }

    // Emit a response event to the client
    socket.emit("mailSent", { message: "Mail sent successfully" });
    // Emit a "receive" event to the client with the receiver_id
    // to individual socketid (private message)
  });

  socket.on("receiveMail", () => {
    // Implement receiving mail logic here
    // Example: You can retrieve mails for the user with userId
    // and emit an event to the client with the received mails
    // const mails = fetchMailsForUser(userId);

    // Emit a response event to the client
    socket.emit("mailReceived", mails);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
