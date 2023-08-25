import { ReactComponent as ProfileIcon } from "../../images/profile-icon.svg";

function ProfileSection() {
  return (
    <>
      <div className="profile-section">
        <ProfileIcon className="profile-icon" />
        <div className="name">Flaviu Cojocaru</div>
        <div className="username">@admin</div>
      </div>
    </>
  );
}

export default ProfileSection;
