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
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const restaurants = useSelector( state => state.restaurants)

  const fetchRestaurants = () => {
    if(restaurants.length === 0) {
      dispatch(beginApiCall());
      setError('')
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

  const createRestaurant = ({restaurant}) => {
    dispatch(beginApiCall());
    setError('')
    restaurantApi.createRestaurant(restaurant).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        setSuccess('Restaurant created successfully')
        dispatch(createRestaurantSuccess(dataResponse ?? []))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const editRestaurant = ({restaurant, id}) => {
    dispatch(beginApiCall());
    setError('')
    restaurantApi.editRestaurant(restaurant, id).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        setSuccess('Restaurant edited successfully')
        dispatch(editRestaurantSuccess(dataResponse ?? []))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const removeRestaurant = ({id}) => {
    dispatch(beginApiCall());
    setError('')
    setSuccess('')
    restaurantApi.removeRestaurant(id).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        setSuccess('Restaurant removed successfully')
        dispatch(removeRestaurantSuccess(id))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  return {
    error,
    success,
    fetchRestaurants,
    createRestaurant,
    editRestaurant,
    removeRestaurant,
    restaurants,
    loading: useSelector(state => state.apiCallsInProgress > 0)
  }
}
