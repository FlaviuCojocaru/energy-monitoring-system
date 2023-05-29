import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { selectAuthTokens } from "../../features/auth/authSlice";
import "../../styles/Header.css";

function Header() {
  const tokens = useSelector(selectAuthTokens);
  const dispatch = useDispatch();

  const onLogout = () => {
    console.log("link pressed")
    dispatch(logout());
    dispatch(reset());
  };

  const default_links = (
    <nav>
      <ul className="nav-items">
        <li>
          <Link to={"/register"}>Register</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </nav>
  );

  const user_links = (
    <ul className="nav-items">
      <li>
        <Link to={"/"} onClick={onLogout}>
          Logout
        </Link>
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
      <div>{!tokens ? default_links : user_links}</div>
    </div>
  );
}

export default Header;
