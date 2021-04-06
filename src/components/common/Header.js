import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {Register} from "../register/Register"
import {useUser} from "../../hooks/useUser/useUser"
import {Login} from "../login/Login"

const Header = () => {
  const [registerOpen, setRegisterOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const { isUserLogged, logout, isOwner } = useUser()

  const activeStyle = {color: "#f15b2a"};
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      {isOwner && (
        <>
          {" | "}
          <NavLink to="/meals" activeStyle={activeStyle}>
            Meals
          </NavLink>
        </>)
      }
      {" | "}
      <NavLink to="/restaurants" activeStyle={activeStyle}>
        Restaurants
      </NavLink>
      {" | "}
      {!isUserLogged && <nav onClick={() => setRegisterOpen(!registerOpen)}>
        Register
      </nav>}
      {registerOpen && !isUserLogged && <Register/>}
      {!isUserLogged && <nav onClick={() => setLoginOpen(!loginOpen)}>
        Login
      </nav>}
      {loginOpen && !isUserLogged && <Login/>}
      {isUserLogged &&
      <nav onClick={logout}>
        Logout
      </nav>}
    </nav>
  );
};

export default Header;
