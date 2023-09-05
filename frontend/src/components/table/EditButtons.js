import { ReactComponent as CancelButton } from "../../images/cancel-icon.svg";
import { ReactComponent as SaveButton } from "../../images/save-icon.svg";

function EditButtons({ row, table }) {
  const meta = table.options.meta;
  const id = row.original.id;

  const setEditedRows = () => {
    meta?.setEditedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    setEditedRows(); // close the edit mode
    meta.updateItem(row.index); // update the user in the db
  };

  const handleCancel = () => {
    setEditedRows(); // close the edit mode
  };

  return (
    <div className="edit-cell">
      <CancelButton className="cancel-icon" onClick={handleCancel} />
      <SaveButton className="save-icon" onClick={handleSave} />
    </div>
  );
}

export default EditButtons;
