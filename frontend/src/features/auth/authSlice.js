import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

import authService from "./authService";
import { IDLE, LOADING, SUCCEEDED, FAILED } from "../../utils/status";

const authTokens = JSON.parse(localStorage.getItem("authTokens"));

const initialState = {
  authTokens: authTokens ? authTokens : null,
  role: authTokens ? jwt_decode(authTokens.access).role : null,
  currentUser: authTokens ? jwt_decode(authTokens.access).username : null,
  status: IDLE,
  message: "",
};

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    let message = "There was an error!";
    if (error.response.status === 401) {
      message = "Invalid username or password";
    } else {
      message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

//register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      await authService.register(user);
      const credentials = { username: user.username, password: user.password };
      return await authService.login(credentials);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = IDLE;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.authTokens = action.payload;
        state.role = jwt_decode(action.payload.access).role;
        state.currentUser = jwt_decode(action.payload.access).username;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = FAILED;
        state.message = action.payload;
        state.authTokens = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authTokens = null;
        state.role = null;
      })
      .addCase(register.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.authTokens = action.payload;
        state.role = jwt_decode(action.payload.access).role;
        state.currentUser = jwt_decode(action.payload.access).username;

      })
      .addCase(register.rejected, (state, action) => {
        state.status = FAILED;
        state.message = action.payload;
        state.authTokens = null;
      });
  },
});

export const selectAuthTokens = (state) => state.auth.authTokens;
export const selectAuthRole = (state) => state.auth.role;
export const selectAuthUser = (state) => state.auth.currentUser;
export const selectAuthInfo = (state) => state.auth;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
