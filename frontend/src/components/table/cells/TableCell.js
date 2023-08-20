import AddressCell from "./AdressCell";
import DescriptionCell from "./DescriptionCell";
import NumberCell from "./NumberCell";
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

  if (columnMeta?.type === "number") {
    return <NumberCell row={row} column={column} table={table} />;
  }

  if (columnMeta?.type === "address") {
    return <AddressCell row={row} column={column} table={table} />;
  }

  if (columnMeta?.type === "description") {
    return <DescriptionCell row={row} column={column} table={table} />;
  }

  return <TextCell row={row} column={column} table={table} />;

}

export default TableCell;
