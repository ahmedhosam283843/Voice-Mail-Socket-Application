import React from "react";
import { socket } from "../socket";

export function ConnectionManager({ userName, setUserName }) {
  function connect() {
    socket.connect();
    socket.timeout(5000).emit("join", userName);
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        placeholder="UserName"
      ></input>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}
