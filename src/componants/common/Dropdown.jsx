import React from "react";

const Dropdown = ({
  name,
  labal,
  onChange,
  items,
  valueProperty,
  nameProperty,
}) => {
  return (
    <div className="form-group">
      <label for={name} class="form-label">
        {labal}
      </label>
      <select id={name} class="form-select" onChange={onChange}>
        <option value="">Choose...</option>
        {items.map((item) => (
          <option key={item[valueProperty]} value={item[valueProperty]}>
            {item[nameProperty]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
