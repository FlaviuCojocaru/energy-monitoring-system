import { useSelector } from "react-redux";
import { selectAuthUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

function WelcomeUser({ image: Image, slogan, userType }) {
  const currentUser = useSelector(selectAuthUser);

  // component for admin
  if (userType === "admin") {
    return (
      <div className="userpage-section lightgray">
        <div className="welcome-text">
          {"Welcome back, "}
          <span>{currentUser.username}</span>
          <p>{slogan}</p>
        </div>
        <Image className="userpage-image" />
      </div>
    );
  }

  // component for client
  return (
    <div className="userpage-section client-userpage-section">
      <div className="left-section">
        <div className="welcome-text">
          {"Welcome back, "}
          <span>{currentUser.username}</span>
          <p>{slogan}</p>
        </div>
        <Link to={`/my-devices`}>{"> My devices"}</Link>
      </div>
      <Image className="client-userpage-image" />
    </div>
  );
}

export default WelcomeUser;
