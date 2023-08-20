import { useEffect, useState } from "react";

function DescriptionCell({ row, column, table }) {
  const tableMeta = table.options.meta;
  const columnMeta = column.columnDef.meta;
  const id = row.original.id;

  // initialize the state
  const currentValue = row.original[column.id];
  const [state, setState] = useState({ value: currentValue });

  // update the store on blur
  const handleOnBlur = () => {
    tableMeta.updateStore(row.index, column.id, state.value);
  };

  // Reset the state when the cell is no longer in edit mode
  useEffect(() => {
    setState({ value: currentValue });
  }, [tableMeta?.editedRows?.[id], currentValue]);

  // cell in edit mode
  if (tableMeta?.editedRows[id]) {
    return (
      <textarea
        className="description-cell"
        value={state.value}
        placeholder={columnMeta?.placeholder}
        onChange={(e) => setState({ value: e.target.value })}
        onBlur={handleOnBlur}
      />
    );
  }

  // cell in view mode
  return (
    <span className={currentValue ? "" : "empty-value"}>
      {currentValue || "N/A"}
    </span>
  );
}

export default DescriptionCell;
