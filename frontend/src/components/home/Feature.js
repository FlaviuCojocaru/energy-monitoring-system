import { Fragment } from "react";
import "../../styles/home.css";

function Feature(props) {
  return (
    <Fragment>
      <props.icon className="icon" />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </Fragment>
  );
}

export default Feature;
