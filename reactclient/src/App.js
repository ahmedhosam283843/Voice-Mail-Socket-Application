import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { MyForm } from "./components/MyForm";
import MessageList from "./components/MessageList";

import "./App.css";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("chat message", ({ senderId, message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId, message, received: true },
      ]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState userName={userName} isConnected={isConnected} />
      <ConnectionManager userName={userName} setUserName={setUserName} />
      <MyForm userName={userName} setMessages={setMessages} />
      <MessageList messages={messages} />
    </div>
  );
}
