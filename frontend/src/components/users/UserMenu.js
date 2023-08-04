import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

import {
  deleteUser,
  selectUsersInfo,
  reset,
} from "../../features/users/usersSlice";
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";
import { ReactComponent as RemoveIcon } from "../../images/remove-icon.svg";
import { selectAuthTokens } from "../../features/auth/authSlice";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "../../utils/status";
import "../../styles/dashboard.css";

function UserMenu({ currentUserId, onClose }) {
  const dispatch = useDispatch();

  const authTokens = useSelector(selectAuthTokens);
  const { users, status, message } = useSelector(selectUsersInfo);

  const handleRemove = (e) => {
    dispatch(deleteUser({ userId: currentUserId, tokens: authTokens }));
  };

  const handleEdit = (e) => {
    console.log("edit");
  };

  return (
    <>
      <div onClick={onClose} className="overlay-menu"></div>
      <div className="dashboard-menu">
        <div onClick={handleEdit}>
          <EditIcon className="dashboard-menu-icon" />
          <span>Edit User</span>
        </div>
        <div onClick={handleRemove}>
          <RemoveIcon className="dashboard-menu-icon" />
          <span>Remove</span>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
