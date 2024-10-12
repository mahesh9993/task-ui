import React from "react";

const Dropdown = ({
  name,
  labal,
  onChange,
  items,
  valueProperty,
  nameProperty,
  value,
  errorMsg,
}) => {
  return (
    <div className="form-group">
      <label for={name} class="form-label">
        {labal}
      </label>
      <select id={name} class="form-select" onChange={onChange} value={value}>
        <option value="">Choose...</option>
        {items.map((item) => (
          <option key={item[valueProperty]} value={item[valueProperty]}>
            {item[nameProperty]}
          </option>
        ))}
      </select>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    </div>
  );
};

export default Dropdown;
