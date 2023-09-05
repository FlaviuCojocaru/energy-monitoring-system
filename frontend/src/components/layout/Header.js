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
import { ReactComponent as HomeIcon } from "../../images/home-icon.svg";
import { ReactComponent as DevicesIcon } from "../../images/devices-icon.svg";
import { ReactComponent as UsersIcon } from "../../images/users-icon.svg";
import { ReactComponent as SensorsIcon } from "../../images/sensors-icon.svg";
import { ReactComponent as EnConsumptionIcon } from "../../images/en-consumption-icon.svg";
import { ReactComponent as LogoutIcon } from "../../images/logout-icon.svg";
import { roles } from "../../utils/roles";
import "../../styles/header.css";
import CustomLink from "../utils/CustomLink";
import {
  reset as resetNavSelection,
} from "../../features/nav/navSlice";

function Header() {
  const tokens = useSelector(selectAuthTokens);
  const role = useSelector(selectAuthRole);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetNavSelection());
  };

  const defaultLinks = (
    <nav>
      <ul className="nav-items">
        <li className="header-link">
          <CustomLink
            text="Register"
            path={"/register"}
            linkIcon={RegisterIcon}
          />
        </li>
        <li className="header-link">
          <CustomLink text="Login" path={"/login"} linkIcon={LoginIcon} />
        </li>
      </ul>
    </nav>
  );

  const userLinks = (
    <ul className="nav-items">
      <li className="nav-item">
        <CustomLink text="Home" path={"/"} linkIcon={HomeIcon} />
      </li>
      <li className="nav-item">
        <CustomLink
          text="My devices"
          path={"/my-devices"}
          linkIcon={DevicesIcon}
        />
      </li>
      <li className="nav-item">
        <CustomLink
          text="En. consumption"
          path={"/en-consumption"}
          linkIcon={EnConsumptionIcon}
        />
      </li>
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
      <li className="nav-item">
        <CustomLink text="Home" path={"/"} linkIcon={HomeIcon} />
      </li>

      <li className="nav-item">
        <CustomLink text="Users" path={"/users"} linkIcon={UsersIcon} />
      </li>

      <li className="nav-item">
        <CustomLink text="Devices" path={"/devices"} linkIcon={DevicesIcon} />
      </li>

      <li className="nav-item">
        <CustomLink text="Sensors" path={"/sensors"} linkIcon={SensorsIcon} />
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
        {!tokens ? defaultLinks : role === roles.admin ? adminLinks : userLinks}
      </div>
    </div>
  );
}

export default Header;
