import * as types from "./actionTypes";

export function getAllMealsSuccess(meals) {
  return { type: types.GET_MEALS_SUCCESS, meals };
}

export function createMealSuccess(meal) {
  return { type: types.CREATE_MEAL_SUCCESS, meal };
}

export function editMealSuccess(meal) {
  return { type: types.UPDATE_MEAL_SUCCESS, meal };
}

export function removeMealSuccess(id) {
  return { type: types.REMOVE_MEAL_SUCCESS, id };
}

