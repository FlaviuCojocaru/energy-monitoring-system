import { configureStore } from '@reduxjs/toolkit'
import headerReducer from '../features/header/headerSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/usersSlice'
import deviceReducer from '../features/devices/deviceSlice'
import sensorReducer from '../features/sensor/sensorSlice'

export default configureStore({
  reducer: {
    header: headerReducer,
    auth: authReducer,
    users: userReducer,
    devices: deviceReducer,
    sensors: sensorReducer,
  }
})