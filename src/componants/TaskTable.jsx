import React, { useEffect, useState } from "react";
import {
  getTasks,
  deleteTask,
  createTask,
  updateTask,
} from "./../services/TaskService";
import Table from "./common/Table";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/Paginate";
import ListGroup from "./common/ListGroup";
import _ from "lodash";
import TaskForm from "./TaskForm";

const TaskTable = ({ searchTerm }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [paginatedTasks, setPaginatedTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [createTaskTrigger, setCreateTaskTrigger] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;
  const tableHeaders = ["Task Id", "User Id", "Title", "Status", ""];

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data.slice(0, 50)))
      .catch((err) => console.log(err));
    //console.log("get tasks", tasks);
  }, [createTaskTrigger]);

  useEffect(() => {
    getUsers();
  }, [tasks]);

  useEffect(() => {
    let result = tasks;

    if (selectedUser && selectedUser.id) {
      result = result.filter((t) => t.userId === selectedUser.id);
    }

    if (searchTerm) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(result);

    const paginated = paginate(result, currentPage, pageSize);
    setPaginatedTasks(paginated);
  }, [tasks, selectedUser, searchTerm, currentPage]);

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
    const usersArray = tasks.map((task) => ({
      id: task.userId,
      name: "User " + task.userId,
    }));

    const uniqueUsers = _.uniqBy(usersArray, "id");

    const users = [{ id: "", name: "All Users" }, ...uniqueUsers];
    //console.log(users);

    setUsers(users);
  }

  const handleUserSelect = (user) => {
    //console.log(user);
    setSelectedUser(user);
    setCurrentPage(1);
  };

  const handleCreateOrUpdateTask = (task) => {
    if (currentTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? { ...task } : t
      );
      setTasks(updatedTasks);
      updateTask(task.id, task);
      getUsers();
    } else {
      createTask(task);
      setCreateTaskTrigger(!createTaskTrigger);
    }

    setCurrentTask(null);
    setShowModal(false);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleCreateTaskBtn = () => {
    setCurrentTask(null);
    setShowModal(true);
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
          <button
            className="btn btn-success mt-3"
            onClick={handleCreateTaskBtn}
          >
            Create New Task
          </button>
          <TaskForm
            users={users.slice(1)}
            onSubmit={handleCreateOrUpdateTask}
            currentTask={currentTask}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <Table
            tasks={paginatedTasks}
            onDelete={handleDelete}
            headers={tableHeaders}
            onEdit={handleEdit}
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
};

export default TaskTable;
