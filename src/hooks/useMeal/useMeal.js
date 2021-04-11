import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createMealSuccess,
  editMealSuccess,
  getAllMealsSuccess,
  removeMealSuccess
} from "../../redux/actions/mealActions"
import {apiCallError, beginApiCall} from "../../redux/actions/apiStatusActions"
import * as mealApi from "../../api/mealApi"
import { handleError, handleResponse } from "../../api/apiUtils"

export const useMeal = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const meals = useSelector( state => state.meals)

  const fetchMeals = () => {
    if(meals.length === 0) {
      dispatch(beginApiCall());
      setError('')
      mealApi.getAllMeals().then((res) => {
        const dataResponse = handleResponse(res)
        if(dataResponse.error) {
          dispatch(apiCallError())
          setError(dataResponse.error)
        } else {
          dispatch(getAllMealsSuccess(dataResponse ?? []))
        }
      }).catch((e) => {
        setError(e.error)
        dispatch(apiCallError())
        handleError(e)
      })
    }
  }

  const createMeal = ({meal, selectedRestaurant}) => {
    dispatch(beginApiCall());
    setError('')
    mealApi.createMeal(meal, selectedRestaurant).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(createMealSuccess(dataResponse ?? []))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const editMeal = ({meal, id, selectedRestaurant}) => {
    dispatch(beginApiCall());
    setError('')
    mealApi.editMeal(meal, id, selectedRestaurant).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(editMealSuccess(dataResponse ?? []))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const removeMeal = ({id}) => {
    dispatch(beginApiCall());
    setError('')
    mealApi.removeMeal(id).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(removeMealSuccess(id))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  return {
    error,
    fetchMeals,
    createMeal,
    editMeal,
    removeMeal,
    meals,
    loading: useSelector(state => state.apiCallsInProgress > 0)
  }
}
