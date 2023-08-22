import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/device-management/sensors";

const getSensors = async (authTokens) => {
  const url = BASE_URL;
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
  const url = BASE_URL;
  const response = await axios.post(url, sensor, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const deleteSensor = async (sensorId, authTokens) => {
  const url = `${BASE_URL}/${sensorId}`;
  const response = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const updateSensor = async (sensorId, sensorData, authTokens) => {
  const url = `${BASE_URL}/${sensorId}`;
  const response = await axios.patch(url, sensorData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const sensorService = {
  getSensors,
  createSensor,
  deleteSensor,
  updateSensor,
};

export default sensorService;
