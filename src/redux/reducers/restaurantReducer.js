import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function restaurantReducer(state = initialState.restaurants, action) {
  switch (action.type) {
    case types.CREATE_RESTAURANT_SUCCESS:
      return [...state, ...action.restaurant]
    case types.UPDATE_RESTAURANT_SUCCESS:
      return state.map(restaurant =>
        restaurant.id === action.restaurant[0].id ? action.restaurant[0] : restaurant
      )
    case types.REMOVE_RESTAURANT_SUCCESS:
      return state.filter(restaurant =>
        restaurant.id !== action.id
      )
    case types.GET_RESTAURANTS_SUCCESS:
      return action.restaurants
    default:
      return state
  }
}
