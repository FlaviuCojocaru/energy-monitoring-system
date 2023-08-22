import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import TableCell from "../table/cells/TableCell";
import EditCell from "../table/cells/EditCell";
import { selectAuthTokens } from "../../features/auth/authSlice";
import {
  deleteSensor,
  removeFromStore,
  selectSensors,
  selectSensorsInfo,
  updateSensor,
  updateStore,
} from "../../features/sensor/sensorSlice";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "../../utils/status";
import { actions } from "../../utils/actions";
import { reset } from "../../features/users/usersSlice";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("device", {
    header: "Device ID",
    cell: TableCell,
    meta: {
      placeholder: "Client",
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
  columnHelper.accessor("max_value", {
    header: "Max. Value",
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

function SensorTable() {
  const dispatch = useDispatch();
  const { sensors, editedSensors } = useSelector(selectSensors);
  const authTokens = useSelector(selectAuthTokens);
  const { status, message, action } = useSelector(selectSensorsInfo);

  // states
  // state that controls which row is in edit mode
  const [editedRows, setEditedRows] = useState({});
  // state that controls which row has the edit modal open
  const [expandedRows, setExpandedRows] = useState({});
  // state that controls which row has the change role modal open
  const [expandedRoles, setExpandedRoles] = useState({});

  const table = useReactTable({
    data: sensors,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows, // state that controls which rows are in edit mode
      setEditedRows,
      expandedRows, // state that controls which row has the edit modal open
      setExpandedRows,
      expandedRoles, // state that controls which row has the change role modal open
      setExpandedRoles,

      // update the sensor state in the redux store
      updateStore: (rowIndex, columnName, value) => {
        const originalValue = sensors[rowIndex][columnName];
        const editedValue = editedSensors[rowIndex][columnName];

        if (originalValue !== value) {
          // data is different from the original value
          dispatch(updateStore({ rowIndex, columnName, value }));
        }

        if (editedValue && originalValue === value && editedValue !== value) {
          // data is the same as the original value so remove from the user state
          dispatch(removeFromStore({ rowIndex, columnName }));
        }
      },

      // update the sensor in the database
      updateItem: (itemIndex) => {
        if (Object.keys(editedSensors[itemIndex]).length) {
          dispatch(
            updateSensor({
              sensorId: sensors[itemIndex].id,
              dataId: itemIndex,
              sensorData: editedSensors[itemIndex],
              tokens: authTokens,
            })
          );
        }
      },

      // remove the user with the given id from the database and update the user state
      removeItem: (itemId) => {
        dispatch(deleteSensor({ sensorId: itemId, tokens: authTokens }));
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
      toast.success("Sensor created successfully");
    }

    if (status === SUCCEEDED && action === actions.delete) {
      toast.success("Sensor deleted successfully");
    }

    if (status === SUCCEEDED && action === actions.update) {
      toast.success("Sensor updated successfully");
    }

    if (status !== IDLE && status !== LOADING) {
      dispatch(reset());
    }
  }, [sensors, status, message, dispatch]);

  // construct the table using react-table library
  return sensors ? (
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

export default SensorTable;
