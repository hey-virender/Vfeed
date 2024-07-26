// src/socket/service.js
import { io } from "socket.io-client";
import Cookie from "js-cookie";

const socket = io("http://localhost:3000", {
  withCredentials: true,
  auth: {
    userId: Cookie.get("user_id"),
    access_token: Cookie.get("access_token"),
  },
});

const socketService = {
  connect: () => {
    socket.connect();
    return socket;
  },
  disconnect: () => {
    socket.disconnect();
  },
  emit: (event, payload) => {
    socket.emit(event, payload);
  },
  on: (event, callback) => {
    socket.on(event, callback);
  },
  off: (event, callback) => {
    socket.off(event, callback);
  },
};

export default socketService;
