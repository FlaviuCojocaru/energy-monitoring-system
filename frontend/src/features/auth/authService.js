import axios from "axios";

const LOGIN_URL = "http://127.0.0.1:8000/user-management/login";
const REGISTER_URL = "http://127.0.0.1:8000/user-management/users";

// login user
const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData, {
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
  await axios.post(REGISTER_URL, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const authService = {
  login,
  logout,
  register,
};

export default authService;
