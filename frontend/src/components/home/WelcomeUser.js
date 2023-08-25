import { useSelector } from "react-redux";
import { selectAuthUser } from "../../features/auth/authSlice";

function WelcomeUser({ image:Image, slogan }) {
  const currentUser = useSelector(selectAuthUser);

  return (
    <div className="userpage-section lightgray">
      <div className="welcome-text">
        {"Welcome back, "} <span>{currentUser}</span>
        <p>{slogan}</p>
      </div>
      <Image className="userpage-image" />
    </div>
  );
}

export default WelcomeUser;
