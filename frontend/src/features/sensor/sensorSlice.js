import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { FAILED, IDLE, LOADING, SUCCEEDED } from "../../utils/status";
import { actions } from "../../utils/actions";
import sensorService from "./sensorService";

const initialState = {
  sensors: [],
  editedSensors: [],
  status: IDLE,
  message: "",
  action: "",
};

// get sensors
export const getSensors = createAsyncThunk(
  "sensor/getSensors",
  async (authTokens, thunkAPI) => {
    try {
      return await sensorService.getSensors(authTokens);
    } catch (error) {
      const message = { message: ["Oops! Something went wrong!"] };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create sensor
export const createSensor = createAsyncThunk(
  "sensor/createSensor",
  async ({ sensor, tokens }, thunkAPI) => {
    try {
      return sensorService.createSensor(sensor, tokens);
    } catch (error) {
      const DefaultMessage = { message: ["Oops! Something went wrong!"] };
      const message = error.response.data || DefaultMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete sensor
export const deleteSensor = createAsyncThunk(
  "sensor/deleteSensor",
  async ({ sensorId, tokens }, thunkAPI) => {
    try {
      await sensorService.deleteSensor(sensorId, tokens);
      return sensorId;
    } catch (error) {
      const DefaultMessage = { message: ["Oops! Something went wrong!"] };
      const message = error.response.data || DefaultMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update sensor
export const updateSensor = createAsyncThunk(
  "sensor/updateSensor",
  async ({ sensorId, sensorData, tokens }, thunkAPI) => {
    try {
      return await sensorService.updateSensor(sensorId, sensorData, tokens);
    } catch (error) {
      const DefaultMessage = { message: ["Oops! Something went wrong!"] };
      const message = error.response.data || DefaultMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sensorSlice = createSlice({
  name: "sensors",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = IDLE;
      state.message = "";
      state.action = "";
    },
     // update the state with the sensor's change
     updateStore: (state, action) => {
      const data = action.payload;
      if (data.value) {
        state.editedSensors[data.rowIndex][data.columnName] = data.value;
      }
    },
    // remove the sensor's change from the state
    removeFromStore: (state, action) => {
      const data = action.payload;
      delete state.editedSensors[data.rowIndex][data.columnName];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSensors.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(getSensors.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.sensors = action.payload;
        state.action = actions.read;
        state.editedSensors = state.sensors.map(() => ({}));
      })
      .addCase(getSensors.rejected, (state, action) => {
        state.status = FAILED;
        state.message = action.payload;
        state.action = actions.read;
        state.sensors = [];
        state.editedSensors = [];
      })
      .addCase(createSensor.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createSensor.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.action = actions.create;
        state.sensors.push(action.payload);
        state.editedSensors.push({});
      })
      .addCase(createSensor.rejected, (state, action) => {
        state.status = FAILED;
        state.message = action.payload;
        state.action = actions.create;
      })
      .addCase(deleteSensor.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(deleteSensor.fulfilled, (state, action) => {
        const deletedSensorId = action.meta.arg.sensorId;

        state.status = SUCCEEDED;
        state.action = actions.delete;
        state.sensors = state.sensors.filter(
          (sensor) => sensor.id !== deletedSensorId);
        state.editedSensors = state.editedSensors.filter(
          (sensor) => sensor.id !== deletedSensorId);
      })
      .addCase(deleteSensor.rejected, (state, action) => {
        state.status = FAILED;
        state.action = actions.delete;
        state.message = action.payload;
      })
      .addCase(updateSensor.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateSensor.fulfilled, (state, action) => {
        const updatedSensorId = action.meta.arg.dataId;
        const updatedAttributes = action.meta.arg.sensorData;

        state.status = SUCCEEDED; // update the status
        state.action = actions.update;

        // update the sensor in the state
        state.sensors[updatedSensorId] = action.payload;

        // reset the updated sensor
        state.editedSensors[updatedSensorId] = {};
      })
      .addCase(updateSensor.rejected, (state, action) => {
        state.status = FAILED;
        state.action = actions.update;
        state.message = action.payload;
        state.editedSensors[action.meta.arg.dataId] = {}; // reset the state
      });
  },
});

export const { reset, updateStore, removeFromStore } = sensorSlice.actions;
export default sensorSlice.reducer;
export const selectSensorsInfo = (state) => state.sensors;
export const selectSensors = (state) => ({
  sensors: state.sensors.sensors,
  editedSensors: state.sensors.editedSensors,
});
