import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthRole } from "../../features/auth/authSlice";
import { roles } from "../../utils/roles";

function AdminRoute() {
  const role = useSelector(selectAuthRole)
  const isAdmin = role===roles.admin

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;
