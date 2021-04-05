import * as types from "./actionTypes";

export function getOrdersForUserSuccess(orders) {
  return { type: types.GET_ORDERS_FOR_USER_SUCCESS, orders };
}

export function createOrderSuccess(order) {
  return { type: types.CREATE_ORDER_SUCCESS, order };
}

export function createOrderMealSuccess(orderId, meal) {
  return { type: types.CREATE_ORDER_MEAL_SUCCESS, orderId, meal };
}

export function updateOrderStatusSuccess(order) {
  return { type: types.UPDATE_ORDER_STATUS_SUCCESS, order };
}

export function addOrderStatusChangeSuccess(statusHistory) {
  return { type: types.ADD_ORDER_STATUS_CHANGE_SUCCESS, statusHistory };
}

