import { Fragment } from "react";
import { ReactComponent as ProfileIcon } from "../../images/profile-icon.svg";

function UserInfo(props) {
  const { firstName, lastName, username } = props;

  return (
    <div className="user-info">
      <ProfileIcon className="profile-icon" />
      <div>
        <h1>{`${firstName} ${lastName}`}</h1>
        <span>@{username}</span>
      </div>
    </div>
  );
}

export default UserInfo;
