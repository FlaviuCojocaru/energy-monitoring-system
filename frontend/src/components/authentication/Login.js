import "../../styles/authentication.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-form login">
      <h1>Login</h1>
      <form>
        <div class="auth-item">
          <input type="text" required placeholder=" "></input>
          <span></span>
          <label>Username</label>
        </div>
        <div class="auth-item">
          <input type="password" required placeholder=" "></input>
          <span></span>
          <label>Password</label>
        </div>
        <button type="submit">Login</button>
        <div className="redirect-link">
          Don't have an account? <Link to={"/register"}>Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
