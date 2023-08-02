import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";
import { ReactComponent as RemoveIcon } from "../../images/remove-icon.svg";
import "../../styles/dashboard.css";

function UserMenu({onClose}) {
  return (
    <>
      <div onClick={onClose} className="overlay-menu"></div>
      <div className="dashboard-menu">
        <div>
          <EditIcon className="dashboard-menu-icon" />
          <span>Edit User</span>
        </div>
        <div>
          <RemoveIcon className="dashboard-menu-icon" />
          <span>Remove</span>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
