import React, { useEffect, useState } from "react"
import Spinner from "../common/Spinner"
import { useUser } from "../../hooks/useUser/useUser"
import { useOrder } from "../../hooks/useOrder/useOrder"
import PropTypes from "prop-types"
import { History } from "./history"

export const OrdersTable = ({ userId }) => {
  const { isOwner, loading } = useUser()
  const { orders, fetchOrders, updateOrderStatus, status } = useOrder()
  const [showHistory, setShowHistory] = useState([])

  useEffect(() => {
    fetchOrders({userId})
  }, [userId])

  const handleChangeStatusOrder = (order, status) => {
    updateOrderStatus({order, status})
  }

  const handleShowHistory = (order) => {
    if (showHistory?.includes(order.id)) {
      setShowHistory(showHistory.filter(showHistory => showHistory !== order.id))
    } else {
      setShowHistory([...showHistory, order.id])
    }
  }

  return (
    <div>
      {loading ? <Spinner/> : (
        <>
          <h2>Orders</h2>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {orders.length === 0 && <p>You don't have orders</p>}
          {orders?.map((order) => {
            return (
              <div key={order.id}>
                <div>
                  <h3>Id: {order.id}</h3>
                  <p>Status: {order.status}</p>
                  {isOwner && <p>User Id: {order.userId}</p>}
                  {!isOwner && ![status.RECEIVED, status.CANCELED, status.DELIVERED].includes(order.status) &&
                  <button onClick={() => handleChangeStatusOrder(order, status.CANCELED)}>Cancel</button>}
                  {isOwner && order.status === status.PLACED &&
                  <button onClick={() => handleChangeStatusOrder(order, status.PROCESSING)}>Process</button>}
                  {isOwner && order.status === status.PROCESSING &&
                  <button onClick={() => handleChangeStatusOrder(order, status.ROUTE)}>Ship</button>}
                  {isOwner && order.status === status.ROUTE &&
                  <button onClick={() => handleChangeStatusOrder(order, status.DELIVERED)}>Deliver</button>}
                  {!isOwner && order.status === status.DELIVERED &&
                  <button onClick={() => handleChangeStatusOrder(order, status.RECEIVED)}>Receive</button>}
                  {isOwner && <button
                    onClick={() => handleShowHistory(order)}>{showHistory?.includes(order.id) ? 'Hide History' : 'Show History'}</button>}
                  {showHistory?.includes(order.id) && <History historyArray={order.statusHistory}/>}
                </div>
                <div>
                  <h4>Order Meals:</h4>
                  {order.meal?.map((meal) => {
                    return (
                      <div key={meal.id}>
                        <p>- {meal.name}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

OrdersTable.propTypes = {
  userId: PropTypes.string
}
