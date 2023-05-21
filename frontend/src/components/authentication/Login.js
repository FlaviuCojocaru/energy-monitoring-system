import "../../styles/login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-form">
      <h1>Login</h1>
      <form>
        <div class="login-item">
          <input type="text" required></input>
          <span></span>
          <label>Username</label>
        </div>
        <div class="login-item">
          <input type="password" required></input>
          <span></span>
          <label>Password</label>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          Don't have an account? <Link to={"/"}>Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
