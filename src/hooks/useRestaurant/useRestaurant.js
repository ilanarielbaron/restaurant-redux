import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createRestaurantSuccess,
  editRestaurantSuccess,
  getAllRestaurantSuccess,
  removeRestaurantSuccess
} from "../../redux/actions/restaurantActions"
import {apiCallError, beginApiCall} from "../../redux/actions/apiStatusActions"
import * as restaurantApi from "../../api/restaurantApi"
import { handleError, handleResponse } from "../../api/apiUtils"

export const useRestaurant = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const restaurants = useSelector( state => state.restaurants)

  const fetchRestaurants = () => {
    if(restaurants.length === 0) {
      dispatch(beginApiCall());
      restaurantApi.getAllRestaurants().then((res) => {
        const dataResponse = handleResponse(res)
        if (dataResponse.error) {
          dispatch(apiCallError())
          setError(dataResponse.error)
        } else {
          dispatch(getAllRestaurantSuccess(dataResponse ?? []))
        }
      }).catch((e) => {
        setError(e.error)
        dispatch(apiCallError())
        handleError(e)
      })
    }
  }

  const createRestaurant = (restaurant) => {
    dispatch(beginApiCall());
    restaurantApi.createRestaurant(restaurant).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(createRestaurantSuccess(dataResponse ?? []))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const editRestaurant = (restaurant, id) => {
    dispatch(beginApiCall());
    restaurantApi.editRestaurant(restaurant, id).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(editRestaurantSuccess(dataResponse ?? []))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const removeRestaurant = (id) => {
    dispatch(beginApiCall());
    restaurantApi.removeRestaurant(id).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(removeRestaurantSuccess(id))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  return {
    error: error,
    fetchRestaurants,
    createRestaurant,
    editRestaurant,
    removeRestaurant,
    restaurants,
    loading: useSelector(state => state.apiCallsInProgress > 0)
  }
}
