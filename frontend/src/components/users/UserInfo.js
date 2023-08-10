import { useEffect, useState } from "react";
import { ReactComponent as ProfileIcon } from "../../images/profile-icon.svg";
import { snakeize } from "../../utils/utils";

function UserInfo({ row, column, table }) {
  const meta = table.options.meta;
  const rowData = row.original;
  const id = row.original.id;

  const getState = () => {
    return {
      firstName: rowData.first_name,
      lastName: rowData.last_name,
      username: rowData.username,
    };
  };
  
  const currentValue = getState();
  const [state, setState] = useState(currentValue);

  // Reset the state when the cell is no longer in edit mode
  useEffect(() => {
    setState(currentValue);
  }, [meta?.editedRows?.[id]]);

  // update the state on input change
  const handleOnChange = (e) => {  
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // update the store on blur
  const handleOnBlur = (e) => {
    meta.updateStore(row.index, snakeize(e.target.name), state[e.target.name]);
  };

  const cell = (
    <div className="info-content">
      <h1>{`${rowData.first_name} ${rowData.last_name}`}</h1>
      <span>@{rowData.username}</span>
    </div>
  );

  const editCell = (
    <div className="info-content">
      <div className="first-row">
        <input
          value={state.firstName}
          name="firstName"
          placeholder="First Name"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        ></input>
        <input
          value={state.lastName}
          name="lastName"
          placeholder="Last Name"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        ></input>
      </div>
      <input
        value={state.username}
        name="username"
        placeholder="Username"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      ></input>
    </div>
  );

  return (
    <div className="user-info">
      <ProfileIcon className="profile-icon" />
      {meta?.editedRows[rowData.id] ? editCell : cell}
    </div>
  );
}

export default UserInfo;
