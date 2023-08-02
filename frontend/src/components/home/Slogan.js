import { useNavigate } from "react-router-dom";
import { ReactComponent as Background } from "../../images/background-v4.svg";

function Slogan() {
  const first_row = "Fueling Sustainable Solutions";
  const second_row = "for a Brighter Tomorrow.";
  const navigate = useNavigate();

  return (
    <div className="slogan-section">
      <div className="slogan-text">
        <p className="first-row">{first_row}</p>
        <p className="second-row">{second_row}</p>
        <button onClick={() => navigate("/register")}>Register Now</button>
      </div>
      <Background className="background-image" />
    </div>
  );
}

export default Slogan;
