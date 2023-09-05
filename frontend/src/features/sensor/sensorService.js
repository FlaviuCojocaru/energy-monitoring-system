import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000/device-management/sensors";
const BASE_URL = "http://127.0.0.1:8000/device-management";

const getSensors = async (authTokens) => {
  const url = `${BASE_URL}/sensors`;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data.map((sensor) => ({
    ...sensor,
    max_value: sensor.max_value.toFixed(2),
  }));
};

const createSensor = async (sensor, authTokens) => {
  const url = `${BASE_URL}/sensors`;
  const response = await axios.post(url, sensor, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const deleteSensor = async (sensorId, authTokens) => {
  const url = `${BASE_URL}/sensors/${sensorId}`;
  const response = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const updateSensor = async (sensorId, sensorData, authTokens) => {
  const url = `${BASE_URL}/sensors/${sensorId}`;
  const response = await axios.patch(url, sensorData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const getSensorData = async (deviceId, date) => {
  const url = `${BASE_URL}/devices/${deviceId}/measurements?date=${date}`;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  response.data.forEach((measurement) => {
    measurement.date = `${measurement.date.slice(11, 13)}:00`;
  });
  return response.data;
};

const sensorService = {
  getSensors,
  createSensor,
  deleteSensor,
  updateSensor,
  getSensorData,
};

export default sensorService;
