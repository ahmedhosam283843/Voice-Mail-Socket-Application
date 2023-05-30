import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:5000";
let socket = null;
const getSocket = (token) => {
  const Headers = {
    auth: {
      token: token,
    },
  };
  if (socket === null) {
    socket = io(URL, Headers);
  }
  return socket;
};

export default getSocket;
