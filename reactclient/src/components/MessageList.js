import React from "react";

function MessageList({ messages }) {
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

export default MessageList;
