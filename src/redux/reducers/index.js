import { combineReducers } from "redux";
import users from "./userReducer";
import meals from "./mealReducer";
import restaurants from "./restaurantReducer";
import orders from "./orderReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  apiCallsInProgress,
  users,
  meals,
  restaurants,
  orders
});

export default rootReducer;
