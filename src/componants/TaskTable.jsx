import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "./../services/TaskService";
import Table from "./common/Table";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/Paginate";
import ListGroup from "./common/ListGroup";
import _ from "lodash";

function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTasks, setPaginatedTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const pageSize = 5;
  const tableHeaders = ["Task Id", "User Id", "Title", "Status", ""];

  useEffect(() => {
    getTasks().then((res) => setTasks(res.data.slice(0, 50)));
  }, []);

  useEffect(() => {
    getUsers();
    setPaginatedTasks(paginate(tasks, currentPage, pageSize));
  }, [tasks, currentPage]);

  //console.log("tasks", tasks);

  const handleDelete = (id) => {
    const updatedTaskList = tasks.filter((t) => t.id !== id);
    setTasks(updatedTaskList);
    //console.log(tasks);
    deleteTask(id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function getUsers() {
    const usersArray = [];
    tasks.map((task) => usersArray.push(task.userId));
    const users = _.uniq(usersArray);
    setUsers(users);
    //console.log(users);
  }

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup items={users} />
      </div>
      <div className="col">
        <div className="container">
          <Table
            tasks={paginatedTasks}
            onDelete={handleDelete}
            headers={tableHeaders}
          />
          <Pagination
            itemsCount={tasks.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskTable;
