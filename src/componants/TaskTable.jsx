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
  const [selectedUser, setSelectedUser] = useState([]);
  const pageSize = 10;
  const tableHeaders = ["Task Id", "User Id", "Title", "Status", ""];

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredTasks =
    selectedUser && selectedUser.id
      ? tasks.filter((t) => t.userId === selectedUser.id)
      : tasks;

  useEffect(() => {
    getUsers();
    setPaginatedTasks(paginate(filteredTasks, currentPage, pageSize));
  }, [tasks, currentPage, selectedUser]);

  //console.log("tasks", tasks);

  function handleDelete(id) {
    const updatedTaskList = tasks.filter((t) => t.id !== id);
    setTasks(updatedTaskList);
    //console.log(tasks);
    deleteTask(id);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function getUsers() {
    const usersArray = [{ id: "", name: "All Users" }];
    tasks.map((task) => {
      const user = {};
      user.id = task.userId;
      user.name = "User " + task.userId;
      usersArray.push(user);
    });
    const users = _.uniqBy(usersArray, "id");
    setUsers(users);
    //console.log(users);
  }

  const handleUserSelect = (user) => {
    //console.log(user);
    setSelectedUser(user);
    setCurrentPage(1);
  };

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          items={users}
          valueProperty="id"
          textProperty="name"
          onItemSelect={handleUserSelect}
          selectedItem={selectedUser}
        />
      </div>
      <div className="col">
        <div className="container">
          <div class="d-flex justify-content-end mt-3 me-3">
            <button class="btn btn-success">Create</button>
          </div>
          <Table
            tasks={paginatedTasks}
            onDelete={handleDelete}
            headers={tableHeaders}
          />
          <Pagination
            itemsCount={filteredTasks.length}
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
