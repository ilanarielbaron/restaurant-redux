import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {logoutUserSuccess, registerUserSuccess} from "../../redux/actions/userActions"
import {apiCallError, beginApiCall} from "../../redux/actions/apiStatusActions"
import * as userApi from "../../api/userApi"
import {handleError, handleResponse} from "../../api/apiUtils"

export const useUser = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState()

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

  const register = (user) => {
    dispatch(beginApiCall());
    userApi.registerUser(user).then((res) => {
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

  return {
    error: error,
    register: register,
    user: useSelector(state => state.users),
    logout: logout,
    isUserLogged: useSelector(state => !!state.users.user),
    loading: useSelector(state => state.apiCallsInProgress > 0)
  }
}
