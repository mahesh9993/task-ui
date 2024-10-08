import React from "react";

const Table = ({ tasks, onDelete, headers }) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          {headers.map((header) => (
            <th scope="col">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.userId}</td>
            <td className="text-start">{task.title}</td>
            <td>{task.completed ? "completed" : "uncompleted"}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
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
