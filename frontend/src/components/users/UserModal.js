import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  createUser,
  reset,
  selectUsersInfo,
} from "../../features/users/usersSlice";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "../../utils/status";
import { ReactComponent as CloseIcon } from "../../images/close-icon.svg";
import "../../styles/modal.css";
import "../../styles/button.css";

function UserModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { users, status, message } = useSelector(selectUsersInfo);
  const roles = { client: "Client", admin: "Administrator" };

  const [isClient, setIsClient] = useState(true);
  const [isCreated, setIsCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "Administrator",
    consumerNumber: "",
  });

  const {
    username,
    password,
    email,
    firstName,
    lastName,
    role,
    consumerNumber,
  } = formData;

  const clearForm = () =>
    setFormData({
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "Administrator",
      consumerNumber: "",
    });

  // display a message if a change is detected or reset the states
  useEffect(() => {
    if (status === FAILED) {
      const keys = Object.keys(message);
      for (let i = 0; i < keys.length; i++) {
        toast.error(`${keys[i]}: ${message[keys[i]][0]}`);
      }
    }

    if (status === SUCCEEDED && isCreated) {
      toast.success("User created successfully");
      setIsCreated(false);
    }

    if (status !== IDLE && status !== LOADING) {
      dispatch(reset());
    }
  }, [users, status, message, dispatch]);

  useEffect(() => {
    setIsClient(role === roles.client);
  }, [role]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = {
      id: users[users.length - 1].id + 1, // get the last id and add 1
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
      role,
    };

    if (role === roles.client) {
      userData = { ...userData, consumer_number: consumerNumber };
    }

    dispatch(createUser(userData));
    console.log('Created');
    setIsCreated(true);
    onClose(); // close the modal
    clearForm(); // clear the form
  };

  return (
    isOpen && (
      <>
        <div className="overlay" onClick={onClose}></div>
        <div className="modal">
          <h1>Create User</h1>
          <form onSubmit={handleSubmit}>
            <div className="modal-row">
              <div className="modal-item">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="modal-item">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="modal-row">
              <div className="modal-item">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="modal-item">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="modal-item">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              ></input>
            </div>

            <div className="modal-select">
              <label>Role:</label>
              <select name="role" value={role} onChange={handleChange}>
                <option>Administrator</option>
                <option>Client</option>
              </select>
            </div>

            {isClient && (
              <div className="modal-item">
                <label>Consumer Number</label>
                <input
                  type="text"
                  name="consumerNumber"
                  value={consumerNumber}
                  onChange={handleChange}
                ></input>
              </div>
            )}
            <div className="modal-footer">
              <button className="button">Create</button>
            </div>
          </form>
          <button className="close-btn" onClick={onClose}>
            <CloseIcon className="close-icon" />
          </button>
        </div>
      </>
    )
  );
}

export default UserModal;
