import { Fragment } from "react";
import Slogan from "../components/home/Slogan";
import Features from "../components/home/Features";
import "../styles/home.css"

function HomePage() {
  return (
    <Fragment>
      <Slogan />
      <Features />
      <div className="padding"></div>
    </Fragment>
  );
}

export default HomePage;
