import React, { useEffect, useState } from "react";
import { socket } from "../socket";

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", ({ senderId, message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId, message, received: true },
      ]);
    });
  }, []);

  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index} className={message.received ? "received" : "sent"}>
          <span>{message.received ? message.senderId : "You"}: </span>
          {message.message}
        </li>
      ))}
    </ul>
  );
}

export { MessageList };
