import React, { useState, useEffect } from "react";
import Dropdown from "./common/Dropdown";
import InputField from "./common/InputField";
import Joi, { number } from "joi";
import Redio from "./common/Redio";

const TaskForm = ({
  users,
  onSubmit,
  currentTask,
  showModal,
  setShowModal,
}) => {
  const [formData, setFormData] = useState({
    userId: "",
    id: "",
    title: "",
    completed: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentTask) setFormData(currentTask);
    else setFormData({ userId: "", id: "", title: "", completed: false });
  }, [currentTask]);

  const schema = Joi.object({
    userId: Joi.number().required().label("Assign To"),
    id: Joi.number().required().label("Task ID"),
    title: Joi.string().required().label("Title"),
    completed: Joi.boolean(),
  });

  const validateField = (name, value) => {
    const fieldSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    const errorMessage = validateField(id, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errorMessage,
    }));
  };

  const handleSubmit = () => {
    const errors = validate();
    setErrors(errors || {});
    //console.log(errors);
    if (errors) return;

    const task = { ...formData };
    task.userId = Number(task.userId);
    onSubmit(task);
    setShowModal(false);
  };

  const handleReset = () => {
    setFormData({ userId: "", id: "", title: "", completed: false });
  };

  const handleStatusChange = (value) => {
    setFormData({ ...formData, completed: value });
  };

  return (
    <div>
      {showModal && (
        <div
          className="modal fade show"
          id="taskModal"
          data-bs-backdrop="static"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="taskModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="taskModalLabel">
                  {currentTask ? "Edit Task" : "Create Task"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
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
                      errorMsg={errors.id}
                      currentTask={currentTask}
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
                      value={formData.userId}
                      errorMsg={errors.userId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="col-12">
                    <InputField
                      name={"title"}
                      label={"Title"}
                      type={"text"}
                      value={formData.title}
                      errorMsg={errors.title}
                      currentTask={currentTask}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Redio
                    completed={formData.completed}
                    onChange={handleStatusChange}
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
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
      )}
    </div>
  );
};

export default TaskForm;
