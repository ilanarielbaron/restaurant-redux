import { combineReducers } from "redux";
import users from "./userReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  apiCallsInProgress,
  users
});

export default rootReducer;
