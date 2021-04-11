import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {Register} from "../register/Register"
import {useUser} from "../../hooks/useUser/useUser"
import {Login} from "../login/Login"

const Header = () => {
  const [registerOpen, setRegisterOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const {isUserLogged, logout, isOwner} = useUser()
  const activeStyle = {color: "#f15b2a"};

  return (
    <div className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='navbar-collapse'>
        <ul className="navbar-nav mr-auto" style={{width: '100%'}}>
          <li className="nav-item">
            <NavLink className='nav-link' to="/" activeStyle={activeStyle} exact>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className='nav-link' to="/about" activeStyle={activeStyle}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            {isOwner && (
              <>
                <NavLink className='nav-link' to="/meals" activeStyle={activeStyle}>
                  Meals
                </NavLink>
              </>)
            }
          </li>
          <li className="nav-item">
            <NavLink className='nav-link' to="/restaurants" activeStyle={activeStyle}>
              Restaurants
            </NavLink>
          </li>
          <div style={actionsContainer}>
            <li className="nav-item">
              {!isUserLogged && <nav style={navStyle} className='nav-link' onClick={() => {
                setRegisterOpen(!registerOpen)
                setLoginOpen(false)
              }}>
                Register
              </nav>}
            </li>
            <li className="nav-item">
              {registerOpen && !isUserLogged && <Register/>}
            </li>
            <li className="nav-item">
              {!isUserLogged && <nav style={navStyle} className='nav-link' onClick={() => {
                setLoginOpen(!loginOpen); setRegisterOpen(false)
              }}>
                Login
              </nav>}
            </li>
            <li className="nav-item">
              {loginOpen && !isUserLogged && <Login/>}
            </li>
            <li className="nav-item">
              {isUserLogged &&
              <nav style={navStyle} className='nav-link' onClick={logout}>
                Logout
              </nav>}
            </li>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Header;

const navStyle = {
  cursor: 'pointer'
}

const actionsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: 'auto'
}
