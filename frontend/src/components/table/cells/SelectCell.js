import { Fragment, useState, useEffect } from "react";
import RolesMenu from "../RolesMenu";
import "../../../styles/dropdown.css";

function SelectCell({ row, column, table }) {
  const tableMeta = table.options.meta;
  const columnMeta = column.columnDef.meta;
  const id = row.original.id;

  // get the current state of the cell
  const getState = () => {
    const choice = columnMeta.choices?.find(
      (choice) => choice.label === row.original[column.id]
    );
    return choice;
  };

  // initialize the state
  const currentValue = getState();
  const [state, setState] = useState(currentValue);

  // Reset the state when the cell is no longer in edit mode
  useEffect(() => {
    setState(currentValue);
  }, [tableMeta?.editedRows?.[id]]);

  // toggle the roles dropdown
  const handleDropdown = () => {
    tableMeta?.setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // cell in edit mode
  if (tableMeta?.editedRows[id]) {
    return (
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
    );
  }

  return (
    <span
      className={"dropdown-choice"}
      style={{ backgroundColor: currentValue.color }}
    >
      {currentValue.value || "N/A"}
    </span>
  );
}

export default SelectCell;
