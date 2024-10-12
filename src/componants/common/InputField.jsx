import React from "react";

const InputField = ({
  name,
  label,
  onChange,
  type,
  value,
  errorMsg,
  currentTask,
}) => {
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
        readOnly={currentTask && name === "id" ? true : false}
      />
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    </div>
  );
};

export default InputField;
