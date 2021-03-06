import React, {useEffect, useState} from "react";
import TextInput from "../common/TextInput";
import { useUser } from "../../hooks/useUser/useUser"
import {toast} from "react-toastify"

export const Register = () => {
  const [newUser, setNewUser] = useState({});
  const [errors, setErrors] = useState({});
  const { loading, register, error } = useUser()

  function formIsValid() {
    const { user, password } = newUser;
    const errors = {};

    if (!user) errors.user = "User is required.";
    if (!password) errors.password = "Password is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    register({user: newUser})
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handleOwnerChange(event) {
    const { name, checked } = event.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: checked
    }));  }

  return (
    <div style={containerStyle} className='card card-body'>
      <form onSubmit={handleSave}>
        <TextInput
          name="user"
          label="User"
          value={newUser.user}
          onChange={handleChange}
          error={errors.user}
        />
        <TextInput
          type='password'
          name="password"
          label="Password"
          value={newUser.password}
          onChange={handleChange}
          error={errors.password}
        />
        <label htmlFor="isOwner"> Is Owner </label>
        <input
          type='checkbox'
          name='isOwner'
          onChange={handleOwnerChange}
          checked={newUser.isOwner ?? false}
        />

        <div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg btn-block">
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  )
}

const containerStyle = {
  zIndex: 1,
  position: 'absolute',
  top: '90%',
  left: '67%'
}
