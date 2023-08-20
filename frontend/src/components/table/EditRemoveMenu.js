import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";
import { ReactComponent as RemoveIcon } from "../../images/remove-icon.svg";
import "../../styles/dashboard.css";

function EditRemoveMenu({ row, table, onClose }) {
  const meta = table.options.meta;
  const id = row.original.id;

  const setEditedRows = () => {
    meta?.setEditedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // remove the item from the current row
  const handleRemove = (e) => {
    meta.removeItem(id);
  };

  const handleEnableEdit = (e) => {
    setEditedRows(); // set the row in edit mode
    onClose(); // close the EditRemoveMenu component
  };

  return (
    <>
      <div onClick={onClose} className="overlay-menu"></div>
      <div className="table-menu">
        <div onClick={handleEnableEdit}>
          <EditIcon className="table-menu-icon" />
          <span>Edit User</span>
        </div>
        <div onClick={handleRemove}>
          <RemoveIcon className="table-menu-icon" />
          <span>Remove</span>
        </div>
      </div>
    </>
  );
}

export default EditRemoveMenu;
