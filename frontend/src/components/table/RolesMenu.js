import { Fragment } from "react";

function RolesMenu({ choices, onClose, setCurrentChoice, row, column, table }) {
  const meta = table.options.meta;

  const handleOnClick = (choice, e) => {
    onClose(e); // close the menu
    setCurrentChoice(choice); // update the ui
    meta.updateStore(row.index, column.id, choice.label); // update the store
  };

  return (
    <Fragment>
      <div onClick={onClose} className="overlay-choices"></div>
      <div className="dropdown-choices">
        {choices.map((choice) => (
          <div
            key={choice.label}
            className="dropdown-choice clickable"
            style={{ backgroundColor: choice.color }}
            onClick={(e) => handleOnClick(choice, e)}
          >
            {choice.value}
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default RolesMenu;
