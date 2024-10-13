import React from "react";

const Redio = ({ completed, onChange, currentTask }) => {
  if (currentTask)
    return (
      <>
        <legend className="col-form-label col-sm-2 pt-0">Status</legend>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="gridRadios1"
              value="pending"
              checked={!completed}
              onChange={() => onChange(false)}
            />
            <label className="form-check-label" htmlFor="gridRadios1">
              Pending
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="gridRadios2"
              value="completed"
              checked={completed}
              onChange={() => onChange(true)}
            />
            <label className="form-check-label" htmlFor="gridRadios2">
              Completed
            </label>
          </div>
        </div>
      </>
    );
};

export default Redio;
