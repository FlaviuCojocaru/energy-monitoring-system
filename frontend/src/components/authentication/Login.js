import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login, reset, selectAuthInfo } from "../../features/auth/authSlice";
import "../../styles/authentication.css";
import { SUCCEEDED, FAILED, IDLE, LOADING } from "../../utils/status";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authTokens, role, status, message } = useSelector(selectAuthInfo);

  useEffect(() => {
    if (status === FAILED) {
      toast.error(message);
    }

    if (status === SUCCEEDED || authTokens) {
      navigate("/");
    }

    if (status !== IDLE && status !== LOADING) {
      dispatch(reset());
    }
  }, [authTokens, status, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className="container-auth">
      <div className="auth-form login">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <div className="auth-item">
            <input
              type="text"
              required
              placeholder=" "
              name="username"
              value={username}
              onChange={onChange}
            ></input>
            <span></span>
            <label>Username</label>
          </div>

          <div className="auth-item">
            <input
              type="password"
              required
              placeholder=" "
              name="password"
              value={password}
              onChange={onChange}
            ></input>
            <span></span>
            <label>Password</label>
          </div>

          <button type="submit">Login</button>

          <div className="redirect-link">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
