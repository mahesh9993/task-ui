import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "./../services/TaskService";
import Table from "./common/Table";

function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const tableHeaders = ["Task Id", "User Id", "Title", "Status", ""];

  useEffect(() => {
    getTasks().then((res) => setTasks(res.data.slice(0, 10)));
  }, []);

  //console.log("tasks", tasks);

  const handleDelete = (id) => {
    const updatedTaskList = tasks.filter((t) => t.id !== id);
    setTasks(updatedTaskList);
    //console.log(tasks);
    deleteTask(id);
  };

  return (
    <div>
      <Table tasks={tasks} onDelete={handleDelete} headers={tableHeaders} />
    </div>
  );
}

export default TaskTable;
