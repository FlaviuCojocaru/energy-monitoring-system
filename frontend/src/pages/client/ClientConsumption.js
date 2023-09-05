import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import DataNotFound from "../../components/device/DataNotFound";
import { setActiveLink } from "../../features/nav/navSlice";
import { selectAuthTokens } from "../../features/auth/authSlice";
import {
  getDevices,
  selectDevices,
  selectSelectedDevice,
} from "../../features/devices/deviceSlice";
import {
  getSensorData,
  selectMeasurements,
} from "../../features/sensor/sensorSlice";

function ClientConsumption() {
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  const { devices } = useSelector(selectDevices);
  const measurements = useSelector(selectMeasurements);
  const selectedDevice = useSelector(selectSelectedDevice);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [deviceId, setDeviceId] = useState(devices.find(device => device.name === selectedDevice)?.id);

  useEffect(() => {
    dispatch(setActiveLink("en. consumption"));
    dispatch(getDevices(authTokens));
  }, []);

  useEffect(() => {
    setDeviceId(devices.find(device => device.name === selectedDevice)?.id);
  }, [devices]);

  useEffect(() => {
    if (deviceId !== undefined) {
      dispatch(getSensorData({ deviceId: deviceId, date: date }));
    }
  }, [deviceId, date]);

  const renderLineChart = (
    <LineChart width={1000} height={400} data={measurements}>
      <Line type="monotone" dataKey="value" stroke="#6aba2f" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <div className="en-consumption">
      <div className="en-consumption-header dashboard ">
        <div>
          <span>Device: </span>
          <select
            name="my-devices"
            onChange={(e) => setDeviceId(e.target.value)}
          >
            {devices.map((device) => (
              <option
                key={device.id}
                value={device.id}
                selected={device.name === selectedDevice}
              >
                {device.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span>Date: </span>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
      </div>

      {measurements.length !== 0 && devices.length !== 0 ? (
        <div className="en-consumption-body">{renderLineChart}</div>
      ) : (
        <DataNotFound />
      )}
    </div>
  );
}

export default ClientConsumption;
