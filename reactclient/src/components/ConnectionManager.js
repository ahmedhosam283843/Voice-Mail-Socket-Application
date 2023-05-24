import React from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

function UserForm({ userId, setUserId }) {
  const history = useNavigate();

  const handleJoin = () => {
    if (userId.trim() !== "") {
      socket.timeout(5000).emit("join", userId);
      history("/chat");
    }
  };

  return (
    <div>
      <label htmlFor="userId">Your User ID: </label>
      <input
        type="text"
        id="userId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}

export { UserForm };
