import * as types from "./actionTypes";

export function getAllRestaurantSuccess(restaurants) {
  return { type: types.GET_RESTAURANTS_SUCCESS, restaurants };
}

export function createRestaurantSuccess(restaurant) {
  return { type: types.CREATE_RESTAURANT_SUCCESS, restaurant };
}

export function editRestaurantSuccess(restaurant) {
  return { type: types.UPDATE_RESTAURANT_SUCCESS, restaurant };
}

export function removeRestaurantSuccess(id) {
  return { type: types.REMOVE_RESTAURANT_SUCCESS, id };
}

