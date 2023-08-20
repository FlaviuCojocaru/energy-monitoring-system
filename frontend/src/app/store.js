import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/usersSlice'
import deviceReducer from '../features/devices/deviceSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    devices: deviceReducer,
  }
})