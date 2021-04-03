import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function restaurantReducer(state = initialState.restaurants, action) {
  switch (action.type) {
    case types.CREATE_RESTAURANT_SUCCESS:
      return [...state, { ...action.restaurants }];
    case types.UPDATE_RESTAURANT_SUCCESS:
      return state.map(course =>
        course.id === action.restaurants.id ? action.restaurants : course
      );
    case types.REMOVE_RESTAURANT_SUCCESS:
      return action.restaurants;
    case types.GET_RESTAURANTS_SUCCESS:
      return state.filter(course => course.id !== action.restaurants.id);
    default:
      return state;
  }
}
