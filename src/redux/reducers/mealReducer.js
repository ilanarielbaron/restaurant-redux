import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function mealReducer(state = initialState.meals, action) {
  switch (action.type) {
    case types.CREATE_MEAL_SUCCESS:
      return [...state, { ...action.meals }];
    case types.UPDATE_MEAL_SUCCESS:
      return state.map(course =>
        course.id === action.meals.id ? action.meals : course
      );
    case types.REMOVE_MEAL_SUCCESS:
      return action.meals;
    case types.GET_MEALS_SUCCESS:
      return state.filter(course => course.id !== action.meals.id);
    default:
      return state;
  }
}
