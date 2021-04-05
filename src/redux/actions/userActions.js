import * as types from "./actionTypes";

export function registerUserSuccess(user) {
  return { type: types.REGISTER_USER_SUCCESS, user };
}

export function loginUserSuccess(user) {
  return { type: types.LOGIN_USER_SUCCESS, user };
}

export function logoutUserSuccess() {
  return { type: types.LOGOUT_USER_SUCCESS };
}

export function userIsOwnerSuccess(isOwner) {
  return { type: types.USER_IS_OWNER_SUCCESS, isOwner };
}
