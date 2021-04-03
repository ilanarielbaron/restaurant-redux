import * as types from "./actionTypes";

export function registerUserSuccess(user) {
  return { type: types.REGISTER_USER_SUCCESS, user };
}

export function logoutUserSuccess() {
  return { type: types.LOGOUT_USER_SUCCESS };
}
