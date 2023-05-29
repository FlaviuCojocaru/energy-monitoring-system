import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { IDLE, LOADING, SUCCEEDED, FAILED } from "../../utils/status";

const authTokens = JSON.parse(localStorage.getItem("authTokens"));

const initialState = {
  authTokens: authTokens ? authTokens : null,
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
      })
      .addCase(login.rejected, (state, action) => {
        state.status = FAILED;
        state.message = action.payload;
        state.authTokens = null;
      });
  },
});

export const selectAuthTokens = (state) => state.auth.authTokens;
export const selectAuthInfo = (state) => state.auth;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
