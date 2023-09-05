import { configureStore } from '@reduxjs/toolkit'
import navReducer from '../features/nav/navSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/usersSlice'
import deviceReducer from '../features/devices/deviceSlice'
import sensorReducer from '../features/sensor/sensorSlice'

export default configureStore({
  reducer: {
    nav: navReducer,
    auth: authReducer,
    users: userReducer,
    devices: deviceReducer,
    sensors: sensorReducer,
  }
})