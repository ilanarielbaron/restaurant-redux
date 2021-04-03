import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return action.user
    case types.REGISTER_USER_SUCCESS:
      return action.user
    case types.BLOCK_USER_SUCCESS:
      return action.user
    case types.LOGOUT_USER_SUCCESS:
      return { users: {} }
    default:
      return state;
  }
}
