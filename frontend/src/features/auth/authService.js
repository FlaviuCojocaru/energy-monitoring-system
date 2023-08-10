import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/user-management";

// login user
const login = async (userData) => {
  const url = `${BASE_URL}/login`;
  const response = await axios.post(url, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.data) {
    // save the tokens in the local storage
    localStorage.setItem("authTokens", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = async () => {
  localStorage.removeItem("authTokens");
};

// register user
const register = async (userData) => {
  const url = `${BASE_URL}/users`;
  const response = await axios.post(url, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const authService = {
  login,
  logout,
  register,
};

export default authService;
