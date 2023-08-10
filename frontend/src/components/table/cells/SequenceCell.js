import { useEffect, useState } from "react";
import { roles } from "../../../utils/roles";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../features/users/usersSlice";

function SequenceCell({ row, column, table }) {
  const { users, editedUsers } = useSelector(selectUsers);
  const tableMeta = table.options.meta;
  const id = row.original.id;

  // initialize the states
  const initialStatus = row.original.role === roles.client;
  const [isEnabled, setIsEnabled] = useState(initialStatus);

  const currentValue = row.original[column.id];
  const [state, setState] = useState({ value: currentValue });

  // set if the cell is enabled or not
  useEffect(() => {
    const editedRole = editedUsers[row.index]?.role;
    const originalRole = users[row.index].role;
    setIsEnabled(editedRole ? editedRole === roles.client : originalRole === roles.client);
    originalRole === roles.admin && setState({value: ""})  // reset the value if the role is admin
  }, [editedUsers[row.index]?.role]);

  // Reset the state when the cell is no longer in edit mode
  useEffect(() => {
    setState({ value: currentValue });
    setIsEnabled(initialStatus)
  }, [tableMeta?.editedRows?.[id]]);

  // update the store on blur
  const handleOnBlur = () => {
    tableMeta.updateStore(row.index, column.id, state.value);
  };

  // cell in edit mode
  if (tableMeta?.editedRows[id] && isEnabled) {
    return (
      <input
        value={state.value || ""}
        placeholder={"N/A"}
        className={"sequence-number-edit"}
        onChange={(e) => setState({ value: e.target.value })}
        onBlur={handleOnBlur}
      />
    );
  }

  // cell in view mode
  return <span className={"sequence-number"}>
    {isEnabled ? currentValue : "N/A"}
    </span>;
}

export default SequenceCell;
