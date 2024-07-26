import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";
import socketMiddleware from "../../socket/middleware";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware, thunk),
});

export default store;
