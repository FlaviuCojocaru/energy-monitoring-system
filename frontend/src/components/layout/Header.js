import { Fragment } from "react";
import "../../styles/Header.css";
import { ReactComponent as Logo } from "../../images/logo.svg";

function Header() {
  return (
    <div className="header">
      <div className="left-section">
        <Logo className="delos-logo" />
      </div>
      <div className>
        <nav>
          <ul className="nav-items">
            <li>Register</li>
            <li>Login</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
