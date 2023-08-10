import { Fragment } from "react";
import { ReactComponent as ThreeDotsIcon } from "../../images/three-dots.svg";
import EditRemoveMenu from "./EditRemoveMenu";

function MenuButton({ row, table }) {
  const meta = table.options.meta;
  const id = row.original.id;

  const handleExpandModal = () => {
    meta?.setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Fragment>
      <ThreeDotsIcon
        className="menu-icon"
        onClick={() => handleExpandModal()}
      />
      {meta?.expandedRows[id] && (
        <EditRemoveMenu row={row} table={table} onClose={handleExpandModal} />
      )}
    </Fragment>
  );
}

export default MenuButton;
