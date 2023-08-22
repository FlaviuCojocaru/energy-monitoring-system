import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";

import HomeSection from "../components/home/HomeSection";
import { selectAuthTokens } from "../features/auth/authSlice";
import UserHomeSection from "../components/home/UserHomeSection";
import { reset, setActiveLink } from "../features/header/headerSlice";

function Home() {
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  dispatch(reset());
  
  return (
    <Fragment>{authTokens ? <UserHomeSection /> : <HomeSection />}</Fragment>
  );
}

export default Home;
