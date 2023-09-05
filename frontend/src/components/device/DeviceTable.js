import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import TableCell from "../table/cells/TableCell";
import {
  reset,
  selectDevices,
  selectDevicesInfo,
  deleteDevice,
  updateDevice,
  updateStore,
  removeFromStore,
} from "../../features/devices/deviceSlice";
import { selectAuthTokens } from "../../features/auth/authSlice";
import EditCell from "../table/cells/EditCell";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "../../utils/status";
import { actions } from "../../utils/actions";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("client", {
    header: "Client",
    cell: TableCell,
    meta: {
      placeholder: "Client",
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: TableCell,
    meta: {
      placeholder: "Name",
    },
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: TableCell,
    meta: {
      type: "description",
      placeholder: "Device description",
    },
  }),
  columnHelper.display({
    header: "Address",
    id: "address",
    cell: TableCell,
    meta: {
      type: "address",
    },
  }),
  columnHelper.accessor("max_energy_consumption", {
    header: "Max Energy Consumption",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.display({
    id: "edit-actions",
    cell: EditCell,
  }),
];

// + address

function DeviceTable() {
  const { devices, editedDevices } = useSelector(selectDevices);
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  const { status, message, action } = useSelector(selectDevicesInfo);

  // states
  // state that controls which row is in edit mode
  const [editedRows, setEditedRows] = useState({});
  // state that controls which row has the edit modal open
  const [expandedRows, setExpandedRows] = useState({});
  // state that controls which row has the change role modal open
  const [expandedRoles, setExpandedRoles] = useState({});

  const table = useReactTable({
    data: devices,
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
        const originalValue = devices[rowIndex][columnName];
        const editedValue = editedDevices[rowIndex][columnName];

        if (originalValue !== value) {
          // data is different from the original value
          dispatch(updateStore({ rowIndex, columnName, value }));
        }

        if (editedValue && originalValue === value && editedValue !== value) {
          // data is the same as the original value so remove from the user state
          dispatch(removeFromStore({ rowIndex, columnName }));
        }
      },

      // update the device in the database
      updateItem: (itemIndex) => {
        if (Object.keys(editedDevices[itemIndex]).length) {
          dispatch(
            updateDevice({
              deviceId: devices[itemIndex].id,
              dataId: itemIndex,
              deviceData: {...devices[itemIndex], ...editedDevices[itemIndex]},
              tokens: authTokens,
            })
          );
        }
      },

      // remove the device with the given id from the database and update the device state
      removeItem: (itemId) => {
        console.log("remove Device");
        dispatch(deleteDevice({ deviceId: itemId, tokens: authTokens }));
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
      toast.success("Device created successfully");
    }

    if (status === SUCCEEDED && action === actions.delete) {
      toast.success("Device deleted successfully");
    }

    if (status === SUCCEEDED && action === actions.update) {
      toast.success("Device updated successfully");
    }

    if (status !== IDLE && status !== LOADING) {
      dispatch(reset());
    }
  }, [devices, status, message, dispatch]);

  // construct the table using react-table library
  return devices ? (
    <table className="content-table table-center">
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

  return <></>;
}

export default DeviceTable;
