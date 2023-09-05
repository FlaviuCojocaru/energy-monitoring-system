import { ReactComponent as Image } from "../../images/no-data.svg";
import "../../styles/not_found.css";

export default function NotFound() {
  return (
    <div className="data-not-found">
      <div className="test">
        <h1>Oops!</h1>
        <p>No data found.</p>
      </div>
      <Image className="image-not-found" />
    </div>
  );
}
