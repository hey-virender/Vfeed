import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pageReducer from "./pageReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
  message: messageReducer,
});

export default rootReducer;
