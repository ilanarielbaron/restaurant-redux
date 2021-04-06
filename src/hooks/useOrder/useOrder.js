import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addOrderStatusChangeSuccess, createOrderMealSuccess,
  createOrderSuccess, getOrdersForUserSuccess,
  updateOrderStatusSuccess
} from "../../redux/actions/orderActions"
import {apiCallError, beginApiCall} from "../../redux/actions/apiStatusActions"
import * as orderApi from "../../api/orderApi"
import { handleError, handleResponse } from "../../api/apiUtils"

export const useOrder = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const [success, setSuccess] = useState(false)

  const status = {
    PLACED: 'Placed',
    CANCELED: 'Canceled',
    PROCESSING: 'Processing',
    ROUTE: 'In Route',
    DELIVERED: 'Delivered',
    RECEIVED: 'Received'
  }

  const fetchOrders = ({userId}) => {
    dispatch(beginApiCall());
    orderApi.getAllOrdersForUser(userId).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(getOrdersForUserSuccess(dataResponse ?? []))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const createOrder = ({order, meals}) => {
    dispatch(beginApiCall());
    orderApi.createOrder(order).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
        setSuccess(false)
      } else {
        dispatch(createOrderSuccess(dataResponse ?? []))
        meals.forEach((meal) => {
          createOrderMeal({orderId: dataResponse[0].id, meal})
        })
        setSuccess(true)
      }
    }).catch((e) => {
      setSuccess(false)
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const createOrderMeal = ({orderId, meal}) => {
    dispatch(beginApiCall());
    orderApi.createMealOrder(orderId, meal.id).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
        setSuccess(false)
      } else {
        dispatch(createOrderMealSuccess(orderId, meal))
      }
    }).catch((e) => {
      setSuccess(false)
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const updateOrderStatus = ({order, newStatus}) => {
    dispatch(beginApiCall());
    orderApi.updateOrderStatus(newStatus, order.id).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(updateOrderStatusSuccess(dataResponse ?? []))
        addOrderStatusChange({statusHistory: {from: order.status, to: newStatus, orderId: order.id}})
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const addOrderStatusChange = ({statusHistory}) => {
    dispatch(beginApiCall());
    orderApi.addOrderStatusChange(statusHistory).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(addOrderStatusChangeSuccess(dataResponse ?? []))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  return {
    error,
    createOrder,
    updateOrderStatus,
    fetchOrders,
    success,
    status,
    orders: useSelector( state => state.orders),
    loading: useSelector(state => state.apiCallsInProgress > 0)
  }
}
