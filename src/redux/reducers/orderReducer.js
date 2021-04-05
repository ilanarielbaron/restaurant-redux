import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case types.GET_ORDERS_FOR_USER_SUCCESS:
      return action.orders
    case types.CREATE_ORDER_SUCCESS:
      return [...state, ...action.order]
    case types.UPDATE_ORDER_STATUS_SUCCESS:
      return state.map(order =>
        order.id === action.order[0].id ? action.order[0] : order
      )
    case types.ADD_ORDER_STATUS_CHANGE_SUCCESS:
      return state.map((order) => {
        if(order.id === action.statusHistory[0].orderId) {
          return {...order, statusHistory: action.statusHistory}
        }
        return order
      })
    default:
      return state
  }
}
