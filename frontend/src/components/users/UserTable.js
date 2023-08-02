import { useSelector } from "react-redux";
import { selectUsers } from "../../features/users/usersSlice";
import { ReactComponent as ThreeDotsIcon } from "../../images/three-dots.svg";
import UserInfo from "./UserInfo";
import "../../styles/dashboard.css";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";

function UserTable() {
  const users = useSelector(selectUsers);
  
 // init state
  let initialState = {};
  useEffect(() => {
    for (const user of users) {
      initialState[user.id] = false;
    }
  }, []);
  const [isOpen, setIsOpen] = useState(initialState)

  const handleOnOpen = (id, e) => {
    setIsOpen({...initialState, [id]:true})
  };

  const handleOnClose = (id, e) => {
    setIsOpen({...initialState})
  };

  return users ? (
    <table className="content-table">
      <thead>
        <tr>
          <th>BASIC INFO</th>
          <th>EMAIL</th>
          <th>ROLE</th>
          <th>CREATED DATE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr id={user.id} key={user.id}>
              <td>
                <UserInfo
                  id={user.id}
                  firstName={user.first_name}
                  lastName={user.last_name}
                  username={user.username}
                />
              </td>
              <td>{user.email ? user.email : "-"}</td>
              <td>{user.role.toLowerCase()}</td>
              <td>{user.created_date}</td>
              <td>
                <ThreeDotsIcon
                  className="edit-icon"
                  onClick={(e) => handleOnOpen(user.id, e)}
                />
                {isOpen[user.id] && <UserMenu onClose={handleOnClose}/>}
              </td>
              {/* <UserMenu /> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <></>
  );
}

export default UserTable;

// construiesc un obiect(hash table) cu id:false/true care o sa dicteze vizibilitatea modalului
