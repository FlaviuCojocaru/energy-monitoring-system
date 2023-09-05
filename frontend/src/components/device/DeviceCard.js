import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import background from "../../images/background-device.jpg";
import { ReactComponent as EditIcon } from "../../images/edit-icon-light.svg";
import { ReactComponent as CancelButton } from "../../images/cancel-icon.svg";
import { ReactComponent as SaveButton } from "../../images/save-icon.svg";
import { setSelectedDevice, updateDevice } from "../../features/devices/deviceSlice";
import { selectAuthTokens } from "../../features/auth/authSlice";

function DeviceCard({ index, device, editedCards, setEditedCards }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authTokens = useSelector(selectAuthTokens);

  const [name, setName] = useState(device.name);
  const [description, setDescription] = useState(device.description);
  const [maxEnCnsumption, setMaxEnCnsumption] = useState(device.max_energy_consumption);

  const {
    country,
    city,
    county,
    street,
    street_number: streetNumber,
    apartment,
  } = device.address;

  const handleOnClick = () => {
    setEditedCards((prev) => ({ ...prev, [index]: true }));
  };

  const handleOnRedirect = () => {
    navigate("/en-consumption");
    dispatch(setSelectedDevice(device.name));
  };

  const handleCancel = () => {
    setEditedCards((prev) => ({ ...prev, [index]: false }));

    // reset the state
    setDescription(device.description);
    setMaxEnCnsumption(device.max_energy_consumption);
  };

  const handleSave = () => {
    setEditedCards((prev) => ({ ...prev, [index]: false }));

    // update the device in the db
    dispatch(
      updateDevice({
        deviceId: device.id,
        dataId: index,
        deviceData: {
          ...device,
          name,
          description,
          max_energy_consumption: maxEnCnsumption,
        },
        tokens: authTokens,
      })
    );
  };

  return (
    <div className="device-card">
      <div className="device-card-header">
        <img src={background} alt="Background Device" />
      </div>

      <div className="device-card-body">
        {editedCards[index] ? (
          <Fragment>
            <input className="device-name"
              value={name}
              placeholder={"Device label/name"}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="device-description">
              <span>Description: </span>
              <textarea
                value={description}
                placeholder={"Device description"}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="device-consumption">
              <span> Max. energy consumption/h: </span>
              <input
                type="number"
                value={maxEnCnsumption}
                onChange={(e) => setMaxEnCnsumption(e.target.value)}
              />{" "}
              kWh
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h1 onClick={handleOnRedirect}>{device.name}</h1>
            <div className="device-description">
              <span>Description: </span>
              {device.description}
            </div>
            <div className="device-consumption">
              <span> Max. energy consumption/h: </span>
              {device.max_energy_consumption} kWh
            </div>
          </Fragment>
        )}
      </div>

      <div className="device-card-footer">
        <div>
          {streetNumber} {street} St, Apt: {apartment},
        </div>
        <div>
          {country} {county} {city}
        </div>
        {editedCards[index] ? (
          <div className="edit-btns">
            <CancelButton className="cancel-icon" onClick={handleCancel} />
            <SaveButton className="save-icon" onClick={handleSave} />
          </div>
        ) : (
          <button className="edit-btn" onClick={handleOnClick}>
            <EditIcon className="edit-icon" />
            <span>Edit</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default DeviceCard;

// meta?.editedRows[id] ? (
//   <EditButtons row={row} table={table} column={column}/>
// ) : (
//   <MenuButton row={row} table={table} />
// )}
