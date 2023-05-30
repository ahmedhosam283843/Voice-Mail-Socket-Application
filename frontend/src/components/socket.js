import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:5000";

const getSocket = (token) => {
  const Headers = {
    auth: {
      token: token,
    },
  };
  const socket = io(URL, Headers);
  return socket;
};

export default getSocket;
