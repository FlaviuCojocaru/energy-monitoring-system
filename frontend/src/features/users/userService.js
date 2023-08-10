import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/user-management/users";

const getUsers = async (authTokens) => {
  const url = BASE_URL;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const deleteUser = async (userId, authTokens) => {
  const url = `${BASE_URL}/${userId}`;
  const response = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const updateUser = async (userId, userData, authTokens) => {
  const url = `${BASE_URL}/${userId}`;
  const response = await axios.patch(url, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const userService = {
  getUsers,
  deleteUser,
  updateUser,
};

export default userService;
