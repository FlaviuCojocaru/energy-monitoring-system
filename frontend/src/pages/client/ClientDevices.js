import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActiveLink } from "../../features/nav/navSlice";
import DeviceCard from "../../components/device/DeviceCard";
import { ReactComponent as HomeIcon } from "../../images/smart-home1.svg";
import { selectAuthTokens } from "../../features/auth/authSlice";
import { getDevices, selectDevices } from "../../features/devices/deviceSlice";

function ClientDevices() {
  const [editedCards, setEditedCards] = useState({});

  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  const { devices } = useSelector(selectDevices);

  useEffect(() => {
    dispatch(setActiveLink("my devices"));
    dispatch(getDevices(authTokens));
  }, []);

  return (
    <Fragment>
      <div className="my-devices-title">
        <HomeIcon className="home-icon" />
        <span>My devices: </span>
      </div>
      <div className="my-devices-body">
        {devices.map((device, index) => (
          <DeviceCard
            key={index}
            index={index}
            device={device}
            editedCards={editedCards}
            setEditedCards={setEditedCards}
          />
        ))}
      </div>
      <div className="padding"></div>
    </Fragment>
  );
}

export default ClientDevices;
