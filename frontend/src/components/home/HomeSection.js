import { Fragment } from "react";
import "../../styles/home.css";
import Slogan from "./Slogan";
import Features from "./Features";

function HomeSection() {
  return (
    <Fragment>
      <Slogan />
      <Features />
    </Fragment>
  );
}

export default HomeSection;
