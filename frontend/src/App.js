import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import RootLayoout from "./components/layout/RootLayout";
import NotFound from "./components/layout/NotFound";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayoout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
