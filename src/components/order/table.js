import React, {useEffect, useState} from "react"
import Spinner from "../common/Spinner"
import {useUser} from "../../hooks/useUser/useUser"
import {useOrder} from "../../hooks/useOrder/useOrder"
import PropTypes from "prop-types"
import {History} from "./history"

export const OrdersTable = ({userId}) => {
  const {isOwner, loading} = useUser()
  const {orders, fetchOrders, updateOrderStatus, status} = useOrder()
  const [showHistory, setShowHistory] = useState([])

  useEffect(() => {
    fetchOrders({userId})
  }, [userId])

  const handleChangeStatusOrder = (order, status) => {
    updateOrderStatus({order, newStatus: status})
  }

  const handleShowHistory = (order) => {
    if (showHistory?.includes(order.id)) {
      setShowHistory(showHistory.filter(showHistory => showHistory !== order.id))
    } else {
      setShowHistory([...showHistory, order.id])
    }
  }

  return (
    <>
      {loading ? <Spinner/> : (
        <>
          <h2>Orders</h2>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {orders.length === 0 && <p>You don't have orders</p>}
          <table className='table'>
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Status</th>
              <th scope="col">User Email</th>
              <th scope="col">Actions</th>
              <th scope="col">Meals Ordered</th>
            </tr>
            </thead>
            <tbody>
            {orders?.map((order) => {
              return (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>{order.status}</td>
                  <td>{order.userId}</td>
                  <td>
                    <StatusAction status={status} isOwner={isOwner} handleChangeStatusOrder={handleChangeStatusOrder} order={order} handleShowHistory={handleShowHistory} showHistory={showHistory} />
                  </td>
                  <td>
                    {order.meal?.map((meal) => {
                      return (
                        <div key={meal.id}>
                          <p>- {meal.name}</p>
                        </div>
                      )
                    })}
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

OrdersTable.propTypes = {
  userId: PropTypes.string
}

const StatusAction = ({isOwner, status, order, handleChangeStatusOrder, handleShowHistory, showHistory}) => {
  let buttonAttr = {status: undefined, label: undefined}

  if (isOwner) {
    switch (order.status) {
      case status.PLACED:
        buttonAttr = {status: status.PROCESSING, label: 'Process'}
        break
      case status.PROCESSING:
        buttonAttr = {status: status.ROUTE, label: 'Ship'}
        break
      case status.ROUTE:
        buttonAttr = {status: status.DELIVERED, label: 'Deliver'}
        break
    }
  }

  if (!isOwner && order.status === status.DELIVERED) buttonAttr = {status: status.RECEIVED, label: 'Receive'}
  const showCancel = (![status.RECEIVED, status.CANCELED, status.DELIVERED].includes(order.status))

  return (
    <>
      {showCancel && <button className='btn btn-danger' onClick={() => handleChangeStatusOrder(order, status.CANCELED)}>Cancel</button>}
      {buttonAttr.status && <button className='btn btn-secondary' onClick={() => handleChangeStatusOrder(order, buttonAttr.status)}>{buttonAttr.label}</button>}
      {isOwner && <button className='btn btn-secondary'
                          onClick={() => handleShowHistory(order)}>{showHistory?.includes(order.id) ? 'Hide History' : 'Show History'}</button>}
      {showHistory?.includes(order.id) && <History historyArray={order.statusHistory}/>}
    </>
  )
}

StatusAction.propTypes = {
  isOwner: PropTypes.bool,
  status: PropTypes.object,
  order: PropTypes.object,
  handleChangeStatusOrder: PropTypes.func,
  handleShowHistory: PropTypes.func,
  showHistory: PropTypes.array
}
