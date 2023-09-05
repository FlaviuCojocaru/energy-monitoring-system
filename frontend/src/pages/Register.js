import { Fragment, useEffect, useState } from "react";
import "../styles/authentication.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset, selectAuthInfo } from "../features/auth/authSlice";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "../utils/status";
import { toast } from "react-toastify";
import { setActiveLink } from "../features/nav/navSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    consumerNumber: "",
  });

  const { username, password, email, firstName, lastName, consumerNumber } =
    formData;

  const { authTokens, status, message } = useSelector(selectAuthInfo);

  useEffect(() => {
    dispatch(setActiveLink("register"));
  }, []);

  useEffect(() => {
    if (status === FAILED) {
      const keys = Object.keys(message);
      for (let i = 0; i < keys.length; i++) {
        toast.error(message[keys[i]][0]);
      }
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
      email,
      first_name: firstName,
      last_name: lastName,
      role: "client",
      consumer_number: consumerNumber,
    };

    dispatch(register(userData));
  };

  return (
    <Fragment>
      <div className="container-auth">
        <div className="auth-form register">
          <div className="register-header">
            <h1>Register</h1>
            <p>It's quick and easy.</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="auth-item register-item">
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

            <div className="auth-item register-item">
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

            <div className="auth-item register-item">
              <input
                type="email"
                required
                placeholder=" "
                name="email"
                value={email}
                onChange={onChange}
              ></input>
              <span></span>
              <label>Email</label>
            </div>

            <div className="auth-item register-item">
              <input
                type="text"
                required
                placeholder=" "
                name="firstName"
                value={firstName}
                onChange={onChange}
              ></input>
              <span></span>
              <label>First Name</label>
            </div>

            <div className="auth-item register-item">
              <input
                type="text"
                required
                placeholder=" "
                name="lastName"
                value={lastName}
                onChange={onChange}
              ></input>
              <span></span>
              <label>Last Name</label>
            </div>

            <div className="auth-item register-item">
              <input
                type="text"
                required
                placeholder=" "
                name="consumerNumber"
                value={consumerNumber}
                onChange={onChange}
              ></input>
              <span></span>
              <label>Consumer number</label>
            </div>

            <button type="submit">Register</button>
            <div className="redirect-link">
              Have an account? <Link to={"/login"}>Log in</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="padding"></div>
    </Fragment>
  );
};

export default Register;
