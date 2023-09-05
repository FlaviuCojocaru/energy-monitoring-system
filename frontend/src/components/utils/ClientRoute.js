import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthRole } from "../../features/auth/authSlice";
import { roles } from "../../utils/roles";

function ClientRoute() {
  const role = useSelector(selectAuthRole)
  const isClient = role===roles.client;

  return isClient ? <Outlet /> : <Navigate to="/" />;
}

export default ClientRoute;
