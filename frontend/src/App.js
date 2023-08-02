import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import RootLayoout from "./components/layout/RootLayout";
import NotFound from "./components/layout/NotFound";
import store from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Fragment } from "react";
import AdminRoute from "./components/utils/AdminRoute";
import UserManagementDashboard from "./components/users/UserManagementDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayoout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* private routes for the admin users */}
      <Route path="/" element={<AdminRoute />}>
        <Route path="/users" element={<UserManagementDashboard />} />
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
