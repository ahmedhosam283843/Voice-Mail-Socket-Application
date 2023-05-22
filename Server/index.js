const http = require("http").createServer();
const io = require("socket.io")(http, {
  // Enable any url to acsses
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("user connected");

  // custom event to listen to
  socket.on("create-something", (mail, msg) => {
    console.log(mail, msg);
  });
  // custom event to listen to
  socket.on("message", (mail, msg) => {
    console.log(mail, msg);
    // prodcast the msg
    io.emit("message", `someone said ${msg}`);
  });
});

http.listen(8080, () => console.log("listening...."));
