import { Fragment } from "react";
import "../../styles/Header.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="left-section">
        <Logo className="delos-logo" />
      </div>
      <div className>
        <nav >
          <ul className="nav-items">
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
