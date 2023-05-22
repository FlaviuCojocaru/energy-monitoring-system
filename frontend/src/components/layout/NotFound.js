import { useRouteError } from "react-router-dom";
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
    </div>
  );
}