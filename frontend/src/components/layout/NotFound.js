import { useRouteError } from "react-router-dom";
import { ReactComponent as Image } from "../../images/no-data.svg";
import "../../styles/not_found.css"

export default function NotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p id="error-type">
        {error.statusText || error.message}
      </p>
    <Image className="image-not-found" />
    </div>
  );
}