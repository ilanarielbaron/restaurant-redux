import React, {useEffect} from "react";
import {useUser} from "../../hooks/useUser/useUser"

export const HomePage = () => {
  const { user, isUserLogged } = useUser()

  useEffect(() => {
    console.log(user)
  }, [isUserLogged, user])

  return (
    <div className="jumbotron">
      <h1>Toptal Challenge</h1>
      <p>React, Redux and React Router for ultra-responsive web apps.</p>
    </div>
  )
}

