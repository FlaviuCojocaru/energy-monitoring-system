import { useSelector } from "react-redux";
import HomeSection from "./HomeSection";
import { Fragment } from "react";
import { selectAuthTokens } from "../../features/auth/authSlice";
import UserHomeSection from "./UserHomeSection";

function Home() {
  const authTokens = useSelector(selectAuthTokens);
  return (
    <Fragment>{authTokens ? <UserHomeSection /> : <HomeSection />}</Fragment>
  );
}

export default Home;
