import { Fragment, useEffect } from "react";
import Slogan from "../../components/home/Slogan";
import Features from "../../components/home/Features";
import { reset } from "../../features/nav/navSlice";
import "../../styles/home.css"
import { useDispatch } from "react-redux";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <Fragment>
      <Slogan />
      <Features />
      <div className="padding"></div>
    </Fragment>
  );
}

export default HomePage;
