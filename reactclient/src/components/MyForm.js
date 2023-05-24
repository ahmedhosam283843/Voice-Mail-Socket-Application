import React, { useState } from "react";
import { socket } from "../socket";

function ChatForm({ userId }) {
  const [inputValue, setInputValue] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat message", {
      senderId: userId,
      receiverId,
      message: inputValue,
    });
    setInputValue("");
  };

  return (
    <div>
      <label htmlFor="receiverId">Receiver ID: </label>
      <input
        type="text"
        id="receiverId"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export { ChatForm };
