// import { io } from "socket.io-client";

const socket = io("ws://localhost:8080");
socket.on("message", (text) => {
  const li = `<li> ${text}</li>`;
  const ul = document.getElementById("Show");
  ul.innerHTML += li;
});

const sendMsg = () => {
  const txt = document.querySelector("input").value;
  socket.emit("message", txt);
};
