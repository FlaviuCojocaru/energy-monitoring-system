import SelectCell from "./SelectCell";
import SequenceCell from "./SequenceCell";
import TextCell from "./TextCell";

function TableCell({ row, column, table }) {
  const columnMeta = column.columnDef.meta;

  if (columnMeta?.type === "dropdown") {
    return <SelectCell row={row} column={column} table={table} />;
  }

  if (columnMeta?.type === "sequence") {
    return <SequenceCell row={row} column={column} table={table} />;
  }

  return <TextCell row={row} column={column} table={table} />;

}

export default TableCell;
