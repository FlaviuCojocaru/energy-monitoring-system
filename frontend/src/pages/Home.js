import { useSelector } from "react-redux";
import { Fragment } from "react";

import HomeSection from "../components/home/HomeSection";
import { selectAuthTokens } from "../features/auth/authSlice";
import UserHomeSection from "../components/home/UserHomeSection";

function Home() {
  const authTokens = useSelector(selectAuthTokens);
  return (
    <Fragment>{authTokens ? <UserHomeSection /> : <HomeSection />}</Fragment>
  );
}

export default Home;
