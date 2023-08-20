import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  selectUsers,
  updateStore,
  updateUser,
  removeFromStore,
  selectUsersInfo,
  reset,
  deleteUser,
} from "../../features/users/usersSlice";
import { selectAuthTokens } from "../../features/auth/authSlice";
import UserInfo from "./UserInfo";
import EditCell from "../table/cells/EditCell";
import TableCell from "../table/cells/TableCell";
import { roles } from "../../utils/roles";
import { actions } from "../../utils/actions";
import "../../styles/dashboard.css";
import "../../styles/table.css";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "../../utils/status";
import { toast } from "react-toastify";

// define the columns for the tanstack react-table library
const columnHelper = createColumnHelper();
const columns = [
  columnHelper.display({
    header: "BASIC INFO",
    cell: UserInfo,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: TableCell,
    meta: {
      type: "email",
      placeholder: "Email",
    },
  }),
  columnHelper.accessor("consumer_number", {
    header: "Consumer Number",
    cell: TableCell,
    meta: {
      type: "sequence",
    },
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: TableCell,
    meta: {
      type: "dropdown",
      choices: [
        { value: "Administrator", label: roles.admin, color: "#faffcb" },
        { value: "Client", label: roles.client, color: "#e4ffc2" },
      ],
    },
  }),
  columnHelper.accessor("created_date", {
    header: "Created Date",
  }),
  columnHelper.display({
    id: "edit-actions",
    cell: EditCell,
  }),
];

function UserTable() {
  const { users, editedUsers } = useSelector(selectUsers);
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  const { status, message, action } = useSelector(selectUsersInfo);

  // states
  // state that controls which row is in edit mode
  const [editedRows, setEditedRows] = useState({});
  // state that controls which row has the edit modal open
  const [expandedRows, setExpandedRows] = useState({});
  // state that controls which row has the change role modal open
  const [expandedRoles, setExpandedRoles] = useState({});

  // define the table instance
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows, // state that controls which rows are in edit mode
      setEditedRows,
      expandedRows, // state that controls which row has the edit modal open
      setExpandedRows,
      expandedRoles, // state that controls which row has the change role modal open
      setExpandedRoles,

      // update the user state in the redux store
      updateStore: (rowIndex, columnName, value) => {
        const originalValue = users[rowIndex][columnName];
        const editedValue = editedUsers[rowIndex][columnName];

        if (originalValue !== value) {
          // data is different from the original value
          dispatch(updateStore({ rowIndex, columnName, value }));
        }

        if (editedValue && originalValue === value && editedValue !== value) {
          // data is the same as the original value so remove from the user state
          dispatch(removeFromStore({ rowIndex, columnName }));
        }
      },

      // update the user in the database
      updateItem: (itemIndex) => {
        if (Object.keys(editedUsers[itemIndex]).length) {
          dispatch(
            updateUser({
              userId: users[itemIndex].id,
              dataId: itemIndex,
              userData: editedUsers[itemIndex],
              tokens: authTokens,
            })
          );
        }
      },

      // remove the user with the given id from the database and update the user state
      removeItem: (itemId) => {
        dispatch(deleteUser({ userId: itemId, tokens: authTokens }));
      },
    },
  });

  const displayErrors = (message) => {
    const keys = Object.keys(message);
    for (let i = 0; i < keys.length; i++) {
      toast.error(`${message[keys[i]][0]}`);
    }
  };

  // display a message if a change is detected or reset the states
  useEffect(() => {
    // failure messages
    if (status === FAILED) {
      displayErrors(message);
    }

    // success mesages
    if (status === SUCCEEDED && action === actions.create) {
      toast.success("User created successfully");
    }

    if (status === SUCCEEDED && action === actions.delete) {
      toast.success("User deleted successfully");
    }

    if (status === SUCCEEDED && action === actions.update) {
      toast.success("User updated successfully");
    }

    if (status !== IDLE && status !== LOADING) {
      dispatch(reset());
    }
  }, [users, status, message, dispatch]);

  // construct the table using react-table library
  return users ? (
    <table className="content-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <></>
  );
}

export default UserTable;
