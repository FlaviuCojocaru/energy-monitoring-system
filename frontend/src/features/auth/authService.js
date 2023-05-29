import axios from "axios";

const API_URL = "http://127.0.0.1:8000/user-management/login";

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL, userData, {
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

const authService = {
  login,
};

export default authService;
