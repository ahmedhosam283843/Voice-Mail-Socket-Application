// import { io } from "socket.io-client";

const socket = io("ws://localhost:8080");

socket.on("message", (text) => {
  const li = `<li> ${text}</li>`;
  const ul = document.getElementById("Show");
  ul.innerHTML += li;
});

const sendMsg = () => {
  const mail = document.getElementById("mail").value;
  const txt = document.getElementById("text").value;

  socket.emit("message", mail, txt);
};
