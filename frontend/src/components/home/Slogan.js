import { ReactComponent as Background } from "../../images/background.svg";

function Slogan() {
  const first_row = "Fueling Sustainable Solutions";
  const second_row = "for a Brighter Tomorrow.";

  return (
    <div className="slogan-section">
      <Background className="background-image"/>
      <p className="first-row">{first_row}</p>
      <p className="second-row">{second_row}</p>
    </div>
  );
}

export default Slogan;
