import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTasks = () => {
  return axios
    .get(API_URL)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      toast.error("Failed to load tasks.");
      console.error("Error fetching tasks:", err);
    });
};

export const createTask = (task) => {
  return axios
    .post(API_URL, task)
    .then((res) => {
      toast.success("Task created successfully!");
      return res.data;
    })
    .catch((err) => {
      toast.error("Error creating task.");
      console.error("Error creating task:", err);
    });
};

export const updateTask = (id, updatedTask) => {
  return axios
    .put(`${API_URL}/${id}`, updatedTask)
    .then((res) => {
      toast.success("Task updated successfully!");
      return res.data;
    })
    .catch((err) => {
      toast.error("Error updating task.");
      console.error("Error updating task:", err);
    });
};

export const deleteTask = (id) => {
  return axios
    .delete(`${API_URL}/${id}`)
    .then((res) => {
      toast.success("Task deleted successfully!");
      return res.data;
    })
    .catch((err) => {
      toast.error("Error deleting task.");
      console.error("Error deleting task:", err);
    });
};
