import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/device-management/devices";

const getDevices = async (authTokens) => {
  const url = BASE_URL;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data.map((device) => ({
    ...device,
    max_energy_consumption: device.max_energy_consumption.toFixed(2),
  }));
};

const createDevice = async (device, authTokens) => {
  const url = BASE_URL;
  const response = await axios.post(url, device, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const deleteDevice = async (deviceId, authTokens) => {
  const url = `${BASE_URL}/${deviceId}`;
  const response = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const updateDevice = async (deviceId, deviceData, authTokens) => {
  const url = `${BASE_URL}/${deviceId}`;
  const response = await axios.patch(url, deviceData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const deviceService = {
  getDevices,
  createDevice,
  deleteDevice,
  updateDevice,
};

export default deviceService;
