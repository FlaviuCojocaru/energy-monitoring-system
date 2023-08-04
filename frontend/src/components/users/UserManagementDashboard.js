import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserTable from "./UserTable";
import UserDashboardInfo from "./UserDashboardInfo";
import { selectAuthTokens } from "../../features/auth/authSlice";
import { getUsers } from "../../features/users/usersSlice";
import UserModal from "./UserModal";

function UserManagementDashboard() {
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers(authTokens));
  }, []);

  return (
    <div className="dashboard-info">
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <UserDashboardInfo onClick={()=>setIsModalOpen(true)}/>
      <UserTable />
    </div>
  );
}

export default UserManagementDashboard;
