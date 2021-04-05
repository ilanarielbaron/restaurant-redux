import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function mealReducer(state = initialState.meals, action) {
  switch (action.type) {
    case types.CREATE_MEAL_SUCCESS:
      return [...state, ...action.meal]
    case types.UPDATE_MEAL_SUCCESS:
      return state.map(meal =>
        meal.id === action.meal[0].id ? action.meal[0] : meal
      )
    case types.REMOVE_MEAL_SUCCESS:
      return state.filter(meal =>
        meal.id !== action.id
      )
    case types.GET_MEALS_SUCCESS:
      return action.meals
    default:
      return state
  }
}
