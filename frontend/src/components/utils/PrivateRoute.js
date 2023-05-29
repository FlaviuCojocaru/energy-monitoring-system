import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  console.log("this route is private");
  let test = false
  return( 
  <>
    {test ? <Outlet /> : <Navigate to="/login" />}
  </>
  );
};

export default PrivateRoute;
