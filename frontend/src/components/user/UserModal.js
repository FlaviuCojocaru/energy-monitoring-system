import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createUser } from "../../features/users/usersSlice";
import { ReactComponent as CloseIcon } from "../../images/close-icon.svg";
import { capitalize } from "../../utils/utils";
import { roles } from "../../utils/roles";
import "../../styles/modal.css";
import "../../styles/button.css";

function UserModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    role: capitalize(roles.admin),
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
      role: capitalize(roles.admin),
      consumerNumber: "",
    });

  useEffect(() => {
    setIsClient(role === capitalize(roles.client));
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
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
      role,
    };

    if (role === capitalize(roles.client)) {
      userData = { ...userData, consumer_number: consumerNumber };
    }

    dispatch(createUser(userData));
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
