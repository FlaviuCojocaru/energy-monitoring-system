import "../../styles/Header.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="left-section">
        <Link to={"/"}>
          <Logo className="delos-logo" />
        </Link>
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default Header;
