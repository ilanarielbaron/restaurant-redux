import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case types.PLACE_ORDER_SUCCESS:
      return [...state, { ...action.orders }];
    case types.CANCEL_ORDER_SUCCESS:
      return state.map(course =>
        course.id === action.orders.id ? action.orders : course
      );
    case types.PROCESS_ORDER_SUCCESS:
      return action.orders;
    case types.ROUTE_ORDER_SUCCESS:
      return state.filter(course => course.id !== action.orders.id);
    case types.DELIVER_ORDER_SUCCESS:
      return state.filter(course => course.id !== action.orders.id);
    case types.RECEIVE_ORDER_SUCCESS:
      return state.filter(course => course.id !== action.orders.id);
    default:
      return state;
  }
}
