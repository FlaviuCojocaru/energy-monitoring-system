import EditButtons from "../EditButtons";
import MenuButton from "../MenuButton";

function EditCell({ row, column, table }) {
  const meta = table.options.meta;
  const id = row.original.id;

  return (
    <div className="edit-cell">
      {meta?.editedRows[id] ? (
        <EditButtons row={row} table={table} column={column}/>
      ) : (
        <MenuButton row={row} table={table} />
      )}
    </div>
  );
}

export default EditCell;
