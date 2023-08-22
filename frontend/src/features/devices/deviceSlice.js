import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "../../utils/status";
import deviceService from "./deviceService";
import { actions } from "../../utils/actions";

const initialState = {
  devices: [],
  editedDevices: [],
  status: IDLE,
  message: "",
  action: "",
};

// get devices
export const getDevices = createAsyncThunk(
  "devices/getDevices",
  async (authTokens, thunkAPI) => {
    try {
      return await deviceService.getDevices(authTokens);
    } catch (error) {
      const message = { message: ["Oops! Something went wrong!"] };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create device
export const createDevice = createAsyncThunk(
  "devices/createDevice",
  async ({ device, tokens }, thunkAPI) => {
    try {
      return deviceService.createDevice(device, tokens);
    } catch (error) {
      const DefaultMessage = { message: ["Oops! Something went wrong!"] };
      const message = error.response.data || DefaultMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete device
export const deleteDevice = createAsyncThunk(
  "devices/deleteDevice",
  async ({ deviceId, tokens }, thunkAPI) => {
    try {
      await deviceService.deleteDevice(deviceId, tokens);
      return deviceId;
    } catch (error) {
      const DefaultMessage = { message: ["Oops! Something went wrong!"] };
      const message = error.response.data || DefaultMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update device
export const updateDevice = createAsyncThunk(
  "devices/updateDevice",
  async ({ deviceId, deviceData, tokens }, thunkAPI) => {
    try {
      return await deviceService.updateDevice(deviceId, deviceData, tokens);
    } catch (error) {
      const DefaultMessage = { message: ["Oops! Something went wrong!"] };
      const message = error.response.data || DefaultMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = IDLE;
      state.message = "";
      state.action = "";
    },
    // update the state with the device's change
    updateStore: (state, action) => {
      const data = action.payload;
      if (data.value) {
        state.editedDevices[data.rowIndex][data.columnName] = data.value;
      }
    },
    // remove the devices's change from the state
    removeFromStore: (state, action) => {
      const data = action.payload;
      delete state.editedDevices[data.rowIndex][data.columnName];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDevices.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(getDevices.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.devices = action.payload;
        state.action = actions.read;
        state.editedDevices = state.devices.map(() => ({}));
      })
      .addCase(getDevices.rejected, (state, action) => {
        state.status = FAILED;
        state.message = action.payload;
        state.action = actions.read;
        state.devices = [];
        state.editedDevices = [];
      })
      .addCase(createDevice.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createDevice.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.action = actions.create;
        state.devices.push(action.payload);
        state.editedDevices.push({});
      })
      .addCase(createDevice.rejected, (state, action) => {
        state.status = FAILED;
        state.message = action.payload;
        state.action = actions.create;
      })
      .addCase(deleteDevice.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(deleteDevice.fulfilled, (state, action) => {
        const deletedDeviceId = action.meta.arg.deviceId;

        state.status = SUCCEEDED;
        state.action = actions.delete;
        state.devices = state.devices.filter((device) => device.id !== deletedDeviceId        );
        state.editedDevices = state.editedDevices.filter(
          (device) => device.id !== deletedDeviceId
        );
      })
      .addCase(deleteDevice.rejected, (state, action) => {
        state.status = FAILED;
        state.action = actions.delete;
        state.message = action.payload;
      })
      .addCase(updateDevice.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        const updatedDeviceId = action.meta.arg.dataId;
        const updatedAttributes = action.meta.arg.deviceData;

        state.status = SUCCEEDED; // update the status
        state.action = actions.update;

        // update the device in the state
        state.devices[updatedDeviceId] = action.payload;

        // reset the updated device
        state.editedDevices[updatedDeviceId] = {};
      })
      .addCase(updateDevice.rejected, (state, action) => {
        state.status = FAILED;
        state.action = actions.update;
        state.message = action.payload;
        state.editedDevices[action.meta.arg.dataId] = {}; // reset the state
      });
  },
});

export const { reset, updateStore, removeFromStore } = deviceSlice.actions;
export default deviceSlice.reducer;
export const selectDevicesInfo = (state) => state.devices;
export const selectDevices = (state) => ({
  devices: state.devices.devices,
  editedDevices: state.devices.editedDevices,
});
