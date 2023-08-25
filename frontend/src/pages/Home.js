import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";

import HomePage from "./HomePage";
import { selectAuthTokens } from "../features/auth/authSlice";
import { reset } from "../features/header/headerSlice";
import UserHomePage from "./UserHomePage";

function Home() {
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  dispatch(reset());
  
  return (
    <Fragment>{authTokens ? <UserHomePage /> : <HomePage />}</Fragment>
  );
}

export default Home;
