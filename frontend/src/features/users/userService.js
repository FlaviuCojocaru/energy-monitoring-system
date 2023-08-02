import axios from "axios";

const GET_URL = "http://127.0.0.1:8000/user-management/users";

const getUsers = async (authTokens) => {
  const response = await axios.get(GET_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens.access}`,
    },
  });
  return response.data;
};

const userService = {
  getUsers,
};

export default userService;
