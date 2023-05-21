import "../../styles/authentication.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-form register">
      <div className="register-header">
        <h1>Sign Up</h1>
        <p>It's quick and easy.</p>
      </div>
      <form>
        <div class="auth-item register-item">
          <input type="text" required placeholder=" "></input>
          <span></span>
          <label>Username</label>
        </div>
        <div class="auth-item register-item">
          <input type="password" required placeholder=" "></input>
          <span></span>
          <label>Password</label>
        </div>
        <div class="auth-item register-item">
          <input type="email" required placeholder=" "></input>
          <span></span>
          <label>Email</label>
        </div>
        <div class="auth-item register-item">
          <input type="text" required placeholder=" "></input>
          <span></span>
          <label>First Name</label>
        </div>
        <div class="auth-item register-item">
          <input type="text" required placeholder=" "></input>
          <span></span>
          <label>Last Name</label>
        </div>
        <div class="auth-item register-item">
          <input type="text" required placeholder=" "></input>
          <span></span>
          <label>Consumer number</label>
        </div>
        <button type="submit">Register</button>
        <div className="redirect-link">
          Have an account? <Link to={"/login"}>Log in</Link>
        </div>
      </form>
    </div>
  );
};
// username, password, email, first name, last name, consumer_number

export default Register;
