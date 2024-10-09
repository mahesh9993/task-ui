import React from "react";

const InputField = ({ name, label, onChange, type, value }) => {
  return (
    <div className="form-group">
      <label for={name} class="form-label">
        {label}
      </label>
      <input
        type={type}
        class="form-control"
        id={name}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default InputField;
