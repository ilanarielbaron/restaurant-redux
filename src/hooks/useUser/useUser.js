import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  loginUserSuccess,
  logoutUserSuccess,
  registerUserSuccess,
  userIsOwnerSuccess
} from "../../redux/actions/userActions"
import {apiCallError, beginApiCall} from "../../redux/actions/apiStatusActions"
import * as userApi from "../../api/userApi"
import {handleError, handleResponse} from "../../api/apiUtils"

export const useUser = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState()

  useEffect(() => {
    fetchIsOwner()
  }, [])

  const getUser = () => {
    return userApi.getUser()
  }

  const fetchIsOwner = () => {
    const loggedUser = getUser()
    if(!loggedUser) return false
    dispatch(beginApiCall());
    userApi.getUserType(loggedUser.id).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(userIsOwnerSuccess(dataResponse[0]?.isOwner))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const logout = () => {
    dispatch(beginApiCall());
    userApi.logout().then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(logoutUserSuccess())
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const register = ({user}) => {
    dispatch(beginApiCall());
    userApi.registerUser(user).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(registerUserSuccess(user))
        userOwner({user, id: dataResponse.id})
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const userOwner = ({user, id}) => {
    dispatch(beginApiCall());
    userApi.makeUserOwner(user, id).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        dispatch(registerUserSuccess(user))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const login = ({user}) => {
    dispatch(beginApiCall());
    userApi.loginUser(user).then((res) => {
      const dataResponse = handleResponse(res)
      if(dataResponse.error) {
        dispatch(apiCallError())
        setError(dataResponse.error)
      } else {
        fetchIsOwner()
        dispatch(loginUserSuccess(user))
      }
    }).catch((e) => {
      setError(e.error)
      dispatch(apiCallError())
      handleError(e)
    })
  }

  const isUserLogged = () => {
    return getUser() !== null
  }

  return {
    error,
    register,
    getUser,
    logout,
    login,
    isOwner: useSelector(state => state.users.isOwner),
    isUserLogged: isUserLogged(),
    loading: useSelector(state => state.apiCallsInProgress > 0)
  }
}
