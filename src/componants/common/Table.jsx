import React from "react";

const Table = ({ tasks, onDelete, headers, onEdit }) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.userId}</td>
            <td className="text-start">{task.title}</td>
            <td>{task.completed ? "completed" : "pending"}</td>
            <td>
              <button
                className="btn btn-success btn-sm m-1"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm m-1"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
