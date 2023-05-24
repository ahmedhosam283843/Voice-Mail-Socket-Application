import React, { useState } from "react";
import { socket } from "../socket";

export function MyForm({ userName, setMessages }) {
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit(
      "chat message",
      {
        senderId: userName,
        receiverId,
        message: message,
      },
      () => {
        setIsLoading(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { userName, message, received: false },
        ]);
      }
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Rec"
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <input placeholder="Msg" onChange={(e) => setMessage(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
