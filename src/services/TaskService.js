import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTasks = () => {
  return axios.get(API_URL);
};

export const createTask = (task) => {
  return axios
    .post(API_URL, task)
    .then((res) => console.log("server response on create", res));
};

export const updateTask = (id, updatedTask) => {
  return axios
    .put(`${API_URL}/${id}`, updatedTask)
    .then((res) => console.log("server response on update", res));
};

export const deleteTask = (id) => {
  return axios
    .delete(`${API_URL}/${id}`)
    .then((res) => console.log("server response on delete", res));
};
