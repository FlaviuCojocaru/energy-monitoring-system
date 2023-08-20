import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as CloseIcon } from "../../images/close-icon.svg";
import "../../styles/modal.css";
import "../../styles/button.css";
import { createDevice } from "../../features/devices/deviceSlice";
import { selectAuthTokens } from "../../features/auth/authSlice";

function DeviceModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);

  const [formData, setFormData] = useState({
    client: "",
    description: "",
    maxEnergyConsumption: "",
    country: "",
    county: "",
    city: "",
    street: "",
    streetNo: "",
    apartment: "",
  });

  const {
    client,
    description,
    maxEnergyConsumption,
    country,
    county,
    city,
    street,
    streetNo,
    apartment,
  } = formData;

  const clearForm = () =>
    setFormData({
      client: "",
      description: "",
      maxEnergyConsumption: "",
      country: "",
      county: "",
      city: "",
      street: "",
      streetNo: "",
      apartment: "",
    });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const address = {
      country,
      city,
      county,
      street,
      street_number: streetNo,
      apartment,
    };

    let formData = {
      client,
      address,
      description,
      max_energy_consumption: maxEnergyConsumption,
    };

    dispatch(createDevice({ device:formData, tokens:authTokens }));
    onClose(); // close the modal
    clearForm(); // clear the form
  };

  return (
    isOpen && (
      <>
        <div className="overlay" onClick={onClose}></div>
        <div className="modal">
          <h1>Create Device</h1>
          <form onSubmit={handleSubmit}>
            <div className="modal-row">
              <div className="modal-item">
                <label>Client</label>
                <input
                  type="text"
                  name="client"
                  value={client}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="modal-item">
                <label>Max. Energy Consumption</label>
                <input
                  type="number"
                  name="maxEnergyConsumption"
                  value={maxEnergyConsumption}
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>
            <div className="modal-row">
              <div className="modal-item">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="modal-row">
              <div className="modal-item">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="modal-item">
                <label>County</label>
                <input
                  type="text"
                  name="county"
                  value={county}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="modal-item">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>

            <div className="modal-row">
              <div className="modal-item">
                <label>Street</label>
                <input
                  type="text"
                  name="street"
                  value={street}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="modal-item">
                <label>Street no</label>
                <input
                  type="text"
                  name="streetNo"
                  value={streetNo}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="modal-item">
                <label>Apartment</label>
                <input
                  type="text"
                  name="apartment"
                  value={apartment}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

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

export default DeviceModal;
