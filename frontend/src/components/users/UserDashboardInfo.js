import { ReactComponent as AddUserIcon } from "../../images/add-user-icon.svg";
import { ReactComponent as SearchIcon } from "../../images/search-icon.svg";
import { useEffect, useState } from "react";
import { selectUsers } from "../../features/users/usersSlice";
import { useSelector } from "react-redux";
import "../../styles/dashboard.css";

function UserDashboardInfo(props) {
  const users = useSelector(selectUsers);
  const [num_users, set_num_users] = useState(users.length);

  useEffect(() => {
    set_num_users(users.length);
  }, [users]);

  return (
    <div>
      <div className="top">
        <div>
          <h1>User Management </h1>
          <span>{num_users} Total</span>
        </div>
      </div>
      <div className="bottom">
        <input placeholder="Search username, email ..."></input>
        <button className="dashboard-btn search-btn">Search</button>
        <button className="dashboard-btn add-btn" onClick={props.onClick}>
          <AddUserIcon className="btn-icon" />
          Add User
        </button>
      </div>
    </div>
  );
}

export default UserDashboardInfo;
