import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDLE, LOADING, SUCCEEDED, FAILED } from "../../utils/status";
import { actions } from "../../utils/actions";
import userService from "./userService";
import authService from "../auth/authService";

const initialState = {
  users: [],
  editedUsers: [],
  status: IDLE,
  message: "",
  action: "",
};

// get users
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (authTokens, thunkAPI) => {
    try {
      return await userService.getUsers(authTokens);
    } catch (error) {
      const message = { message: ["Oops! Something went wrong!"] };
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
      const DefaultMessage = { message: ["Oops! Something went wrong!"] };
      const message = error.response.data || DefaultMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ userId, tokens }, thunkAPI) => {
    try {
      await userService.deleteUser(userId, tokens);
      return userId;
    } catch (error) {
      const DefaultMessage = { message: ["Oops! Something went wrong!"] };
      const message = error.response.data || DefaultMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData, tokens }, thunkAPI) => {
    try {
      return await userService.updateUser(userId, userData, tokens);
    } catch (error) {
      const DefaultMessage = { message: ["Oops! Something went wrong!"] };
      const message = error.response.data || DefaultMessage;
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
      state.action = "";
    },
    // update the state with the user's change
    updateStore: (state, action) => {
      const data = action.payload;
      if (data.value) {
        state.editedUsers[data.rowIndex][data.columnName] = data.value;
      }
    },
    // remove the user's change from the state
    removeFromStore: (state, action) => {
      const data = action.payload;
      delete state.editedUsers[data.rowIndex][data.columnName];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.action = actions.read;
        state.users = action.payload;
        state.editedUsers = state.users.map(() => ({}));
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = FAILED;
        state.action = actions.read;
        state.message = action.payload;
        state.users = [];
        state.editedUsers = [];
      })
      .addCase(createUser.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.action = actions.create;
        state.users.push(action.payload);
        state.editedUsers.push({});
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = FAILED;
        state.action = actions.create;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserId = action.meta.arg.userId;

        state.status = SUCCEEDED;
        state.action = actions.delete;
        state.users = state.users.filter((user) => user.id !== deletedUserId);
        state.editedUsers = state.editedUsers.filter(
          (user) => user.id !== deletedUserId
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = FAILED;
        state.action = actions.delete;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUserId = action.meta.arg.dataId;
        const updatedAttributes = action.meta.arg.userData;

        state.status = SUCCEEDED; // update the status
        state.action = actions.update;

        // update the user in the state
        state.users[updatedUserId] = action.payload;

        // reset the updated user
        state.editedUsers[updatedUserId] = {};
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = FAILED;
        state.action = actions.update;
        state.message = action.payload;
        state.editedUsers[action.meta.arg.dataId] = {}; // reset the state
      });
  },
});

export const { reset, updateStore, removeFromStore } = userSlice.actions;
export default userSlice.reducer;

export const selectUsersInfo = (state) => state.users;
export const selectUsers = (state) => ({
  users: state.users.users,
  editedUsers: state.users.editedUsers,
});
