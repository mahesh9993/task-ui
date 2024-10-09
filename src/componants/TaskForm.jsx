import React, { useState } from "react";
import Dropdown from "./common/Dropdown";
import InputField from "./common/InputField";

const TaskForm = ({ users }) => {
  const [formData, setFormData] = useState({
    userId: "",
    id: "",
    title: "",
    completed: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = () => {};

  const handleReset = () => {
    setFormData({ userId: "", id: "", title: "" });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success mt-3"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Create New Task
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Create Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form class="row g-3">
                <div class="col-md-6">
                  <InputField
                    name={"id"}
                    label={"Task ID"}
                    type={"number"}
                    value={formData.id}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="col-md-6">
                  <Dropdown
                    items={users}
                    name={"userId"}
                    labal={"Assign To"}
                    valueProperty={"id"}
                    nameProperty={"name"}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="col-12">
                  <InputField
                    name={"title"}
                    label={"Title"}
                    type={"text"}
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
