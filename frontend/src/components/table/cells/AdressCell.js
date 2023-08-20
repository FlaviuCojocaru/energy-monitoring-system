import { useEffect, useState } from "react";

function AddressCell({ row, column, table }) {
  const tableMeta = table.options.meta;
  const id = row.original.id;

  const currentValue = row.original[column.id];
  const [state, setState] = useState({ value: currentValue });

  const {
    country,
    city,
    county,
    street,
    street_number: streetNumber,
    apartment,
  } = state.value;

  // update the store on blur
  const handleOnBlur = () => {
    tableMeta.updateStore(row.index, column.id, state.value);
  };

  const handleOnChange = (e) => {
    setState((previousState) => ({
      ...previousState,
      value: {
        ...previousState.value,
        [e.target.name]: e.target.value,
      },
    }));
  };

  // Reset the state when the cell is no longer in edit mode
  useEffect(() => {
    setState({ value: currentValue });
  }, [tableMeta?.editedRows?.[id], currentValue]);

  // cell in edit mode
  if (tableMeta?.editedRows[id]) {
    return (
      <div className="address-cell">
        <div className="address-row">
          <input
            value={streetNumber || ""}
            name={"street_number"}
            placeholder={"Street No"}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          <input
            value={street || ""}
            name={"street"}
            placeholder={"Street"}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          <input
            value={apartment || ""}
            name={"apartment"}
            placeholder={"Apt"}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
        </div>

        <div className="address-row">
          <input
            value={country || ""}
            name={"country"}
            placeholder={"Country"}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          <input
            value={county || ""}
            name={"county"}
            placeholder={"County"}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          <input
            value={city || ""}
            name={"city"}
            placeholder={"City"}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
        </div>
      </div>
    );
  }

  // cell in view mode
  return (
    <div className="address">
      <div>
        {streetNumber} {street} St, Apt: {apartment},
      </div>
      <div>
        {country} {county} {city}
      </div>
    </div>
  );
}

export default AddressCell;
