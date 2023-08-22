import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as CloseIcon } from "../../images/close-icon.svg";
import { createSensor } from "../../features/sensor/sensorSlice";
import { selectAuthTokens } from "../../features/auth/authSlice";

function SensorModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);

  const [formData, setFormData] = useState({
    device: "",
    maxValue: "",
    description: "",
  });

  const { device, maxValue, description } = formData;

  const clearForm = () =>
    setFormData({
      device: "",
      maxValue: "",
      description: "",
    });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      device,
      max_value: maxValue,
      description,
    };

    dispatch(createSensor({ sensor:formData, tokens:authTokens }));
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
                <label>Device</label>
                <input
                  type="text"
                  name="device"
                  value={device}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="modal-item">
                <label>Max. Value</label>
                <input
                  type="number"
                  name="maxValue"
                  value={maxValue}
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

export default SensorModal;
