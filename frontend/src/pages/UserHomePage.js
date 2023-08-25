import { useEffect } from "react";
import { useDispatch } from "react-redux";

import UserPageSection from "../components/home/UserPageSection";
import WelcomeUser from "../components/home/WelcomeUser";
import { ReactComponent as WelcomeImage } from "../images/welcomeadmin.svg";
import { ReactComponent as UserSectionImage } from "../images/manageClients.svg";
import { ReactComponent as DeviceSectionImage } from "../images/manageDevices.svg";
import { ReactComponent as SensorsSectionImage } from "../images/manageSensors.svg";
import "../styles/home.css";
import { setActiveLink } from "../features/header/headerSlice";

function UserHomePage() {
  const dispatch = useDispatch();
  const slogan =
    "If you spend too much time thinking about a thing, you'll never get it done.";

    useEffect(() => {
      dispatch(setActiveLink("home"));
    }, []);

  return (
    <div>
      <WelcomeUser image={WelcomeImage} slogan={slogan} />
      <UserPageSection
        item={"users"}
        image={UserSectionImage}
        color={"white"}
      />
      <UserPageSection
        item={"devices"}
        image={DeviceSectionImage}
        color={"white"}
        swap={true}
      />
      <UserPageSection
        item={"sensors"}
        image={SensorsSectionImage}
        color={"lightgray"}
      />
      <div className="padding"></div>
    </div>
  );
}

export default UserHomePage;
