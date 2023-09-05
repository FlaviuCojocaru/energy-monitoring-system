import { useSelector } from "react-redux";
import { Fragment } from "react";

import HomePage from "../../pages/home/HomePage";
import { selectAuthTokens } from "../../features/auth/authSlice";
import UserHomePage from "../../pages/home/UserHomePage";

function Home() {
  const authTokens = useSelector(selectAuthTokens);

  return <Fragment>{authTokens ? <UserHomePage /> : <HomePage />}</Fragment>;
}

export default Home;
