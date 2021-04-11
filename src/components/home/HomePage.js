import React from "react";
import {useUser} from "../../hooks/useUser/useUser"
import {OrdersTable} from "../order/table"

export const HomePage = () => {
  const {isOwner, isUserLogged, getUser} = useUser()
  const userId = isUserLogged && getUser().id

  return (
    <div className='card'>
      <div className='card-body'>
        <h1 className='card-title jumbotron'>Toptal Challenge</h1>
        {isUserLogged && !isOwner && (
          <OrdersTable userId={userId}/>
        )}
        {isUserLogged && isOwner && (
          <OrdersTable/>
        )}
      </div>
    </div>
  )
}

