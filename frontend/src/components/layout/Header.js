import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import {
  selectAuthTokens,
  selectAuthRole,
} from "../../features/auth/authSlice";

import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as LoginIcon } from "../../images/login-icon.svg";
import { ReactComponent as RegisterIcon } from "../../images/register-icon.svg";
import { ReactComponent as DevicesIcon } from "../../images/devices-icon.svg";
import { ReactComponent as UsersIcon } from "../../images/users-icon.svg";
import { ReactComponent as SensorsIcon } from "../../images/sensors-icon.svg";
import { ReactComponent as LogoutIcon } from "../../images/logout-icon.svg";
import { ADMIN } from "../../utils/roles";
import "../../styles/Header.css";

function Header() {
  const tokens = useSelector(selectAuthTokens);
  const role = useSelector(selectAuthRole);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const defaultLinks = (
    <nav>
      <ul className="nav-items">
        <li className="header-link">
          <RegisterIcon className="header-icon" />
          <Link to={"/register"}>Register</Link>
        </li>
        <li className="header-link">
          <LoginIcon className="header-icon" />
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </nav>
  );

  const userLinks = (
    <ul className="nav-items">
      <li className="header-btn">
        <button onClick={onLogout}>
          <LogoutIcon className="header-icon" />
          Logout
        </button>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul className="nav-items">
      <li className="header-link">
        <UsersIcon className="header-icon" />
        <Link to={"/users"}>Users</Link>
      </li>
      <li className="header-link">
        <DevicesIcon className="header-icon" />
        <Link to={"/devices"}>Devices</Link>
      </li>
      <li className="header-link">
        <SensorsIcon className="header-icon" />
        <Link to={"/sensors"}>Sensors</Link>
      </li>
      <li className="header-btn">
        <button onClick={onLogout}>
          <LogoutIcon className="header-icon" />
          Logout
        </button>
      </li>
    </ul>
  );

  return (
    <div className="header">
      <div className="left-section">
        <Link to={"/"}>
          <Logo className="delos-logo" />
        </Link>
      </div>
      <div>
        {!tokens ? defaultLinks : role === ADMIN ? adminLinks : userLinks}
      </div>
    </div>
  );
}

export default Header;
