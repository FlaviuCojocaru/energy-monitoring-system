import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDLE, LOADING, SUCCEEDED, FAILED } from "../../utils/status";
import userService from "./userService";
import authService from "../auth/authService";

const initialState = {
  users: [],
  status: IDLE,
  message: "",
};

// get users
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (authTokens, thunkAPI) => {
    try {
      return await userService.getUsers(authTokens);
    } catch (error) {
      let message = "There was an error!";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create user
export const createUser = createAsyncThunk(
  "users/createUsers",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      // let message = "There was an error!";
      const message = error.response && error.response.data && error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = IDLE;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = FAILED;
        state.message = action.payload;
        state.users = [];
      })
      .addCase(createUser.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = FAILED;
        state.message = action.payload;
      })
  },
});

export const selectUsersInfo = (state) => state.users;
export const selectUsers = (state) => state.users.users;
export const { reset } = userSlice.actions;
export default userSlice.reducer;
