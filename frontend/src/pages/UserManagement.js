import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserTable from "../components/user/UserTable";
import DashboardInfo from "../components/dashboard/DashboardInfo";
import { selectAuthTokens } from "../features/auth/authSlice";
import { getUsers, selectUsers } from "../features/users/usersSlice";
import UserModal from "../components/user/UserModal";
import { ReactComponent as AddUserIcon } from "../images/add-user-icon.svg";

function UserManagement() {
  const { users } = useSelector(selectUsers);
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers(authTokens));
  }, []);

  return (
    <div className="dashboard-info">
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DashboardInfo
        contentName={"User"}
        content={users}
        placeholder={"Search username, email ..."}
        buttonIcon={AddUserIcon}
        onClick={() => setIsModalOpen(true)}
      />
      <UserTable />
    </div>
  );
}

export default UserManagement;
