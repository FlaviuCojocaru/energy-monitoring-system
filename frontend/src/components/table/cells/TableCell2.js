import { useState, Fragment, useEffect } from "react";

import "../../../styles/dropdown.css";
import RolesMenu from "../RolesMenu";

function TableCell({ row, column, table }) {
  const tableMeta = table.options.meta;
  const columnMeta = column.columnDef.meta;
  const id = row.original.id;

  // get the current state of the cell
  const getState = () => {
    if (columnMeta?.type === "dropdown") {
      const choice = columnMeta.choices?.find(
        (choice) => choice.label === row.original[column.id]
      );
      return choice;
    }
    return { value: row.original[column.id] };
  };

  const initialValue = getState();
  const [state, setState] = useState(initialValue);

  // Reset the state when the cell is no longer in edit mode
  useEffect(() => {
    if (!tableMeta?.editedRows?.[id]) {
      setState(initialValue);
    }
  }, [tableMeta?.editedRows?.[id]]);

  // update the store on blur
  const handleOnBlur = () => {
    tableMeta.updateStore(row.index, column.id, state.value);
  };

  // toggle the roles dropdown
  const handleDropdown = () => {
    tableMeta?.setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // cell in edit mode
  if (tableMeta?.editedRows[id]) {
    return columnMeta?.type === "dropdown" ? (
      <Fragment>
        <span
          className="dropdown-choice clickable"
          onClick={handleDropdown}
          style={{ backgroundColor: state.color }}
        >
          {state.value}
        </span>
        {tableMeta?.expandedRoles[id] && (
          <RolesMenu
            choices={columnMeta?.choices}
            onClose={handleDropdown}
            setCurrentChoice={setState}
            row={row}
            column={column}
            table={table}
          />
        )}
      </Fragment>
    ) : (
      <input
        value={state.value || "N/A"}
        placeholder={columnMeta?.placeholder}
        className={columnMeta?.cssClass + "-edit"}
        onChange={(e) => setState({ value: e.target.value })}
        onBlur={handleOnBlur}
      />
    );
  }

  // cell in view mode
  return (
    <span
      className={columnMeta?.cssClass}
      style={{ backgroundColor: state.color }}
    >
      {state.value || "N/A"}
    </span>
  );
}

export default TableCell;
