import React from "react";

export function ConnectionState({ isConnected, userName }) {
  return <p>State: {"" + isConnected + " : " + userName}</p>;
}
