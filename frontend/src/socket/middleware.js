// src/redux/middleware/socketMiddleware.js
import socketService from "../socket/service";
import Cookie from "js-cookie";

const socketMiddleware = (store) => {
  const socket = socketService.connect();

  socket.on("connect", () => {
    const token = Cookie.get("access_token");
    socket.emit("authenticate", { token });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return (next) => (action) => {
    return next(action);
  };
};

export default socketMiddleware;
