import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {Register} from "../register/Register"
import {useUser} from "../../hooks/useUser/useUser"

const Header = () => {
  const [registerOpen, setRegisterOpen] = useState(false)
  const { isUserLogged, logout } = useUser()

  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/restaurants" activeStyle={activeStyle}>
        Restaurants
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      {" | "}
      {!isUserLogged && <nav onClick={() => setRegisterOpen(!registerOpen)}>
        Register
      </nav>}
      {registerOpen && !isUserLogged && <Register  />}
      {isUserLogged &&
      <nav onClick={logout}>
        Logout
      </nav>}
    </nav>
  );
};

export default Header;
