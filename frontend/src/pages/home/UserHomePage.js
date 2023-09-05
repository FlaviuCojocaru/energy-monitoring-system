import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActiveLink } from "../../features/nav/navSlice";
import {
  getUser,
  selectAuthId,
  selectAuthRole,
  selectAuthTokens,
  selectAuthUser,
} from "../../features/auth/authSlice";
import { roles } from "../../utils/roles";
import UserPageSection from "../../components/home/UserPageSection";
import WelcomeUser from "../../components/home/WelcomeUser";
import { ReactComponent as adminBackgroundImage } from "../../images/welcomeadmin.svg";
import { ReactComponent as clientBackgroundImage } from "../../images/client-background1.svg";
import { ReactComponent as UserSectionImage } from "../../images/manageClients.svg";
import { ReactComponent as DeviceSectionImage } from "../../images/manageDevices.svg";
import { ReactComponent as SensorsSectionImage } from "../../images/manageSensors.svg";
import "../../styles/home.css";

function UserHomePage() {
  const dispatch = useDispatch();
  const role = useSelector(selectAuthRole);
  const userId = useSelector(selectAuthId);
  const authTokens = useSelector(selectAuthTokens);
  const currentUser = useSelector(selectAuthUser);

  const adminSlogan = "If you spend too much time thinking about a thing, you'll never get it done.";
  const clientSlogan = "Let us do the work, so you can focus on what matters.";

  useEffect(() => {
    dispatch(setActiveLink("home"));
    dispatch(getUser({ userId, authTokens }));
  }, []);

  // admin homepage
  if (role == roles.admin) {
    return (
      currentUser && (
        <div>
          <WelcomeUser
            image={adminBackgroundImage}
            slogan={adminSlogan}
            userType={"admin"}
          />
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
      )
    );
  }

  // client homepage
  return (
    currentUser && (
      <Fragment>
        <WelcomeUser
          image={clientBackgroundImage}
          slogan={clientSlogan}
          userType={"client"}
        />
        <div className="padding"></div>
      </Fragment>
    )
  );
}

export default UserHomePage;