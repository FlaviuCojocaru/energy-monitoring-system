import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import store from "./app/store";
import { Fragment } from "react";
import AdminRoute from "./components/utils/AdminRoute";
import ClientRoute from "./components/utils/ClientRoute";
import RootLayoout from "./components/layout/RootLayout";
import NotFound from "./components/layout/NotFound";
import Home from "./components/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManagement from "./pages/admin/UserManagement";
import DeviceManagement from "./pages/admin/DeviceManagement";
import SensorManagement from "./pages/admin/SensorManagement";
import ClientDevices from "./pages/client/ClientDevices";
import ClientConsumption from "./pages/client/ClientConsumption";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayoout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* private routes for the admin users */}
      <Route path="/" element={<AdminRoute />}>
        <Route path="/users" element={<UserManagement />} />
        <Route path="/devices" element={<DeviceManagement />} />
        <Route path="/sensors" element={<SensorManagement />} />
      </Route>

      {/* private routes for the client users */}
      <Route path="/" element={<ClientRoute />}>
        <Route path="/my-devices" element={<ClientDevices />} />
        <Route path="/en-consumption" element={<ClientConsumption />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
}

// export const URLSTRING = 'http://localhost:8000/';

export default App;
