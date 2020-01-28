const axios = require("axios");

let apiUrl = "https://us-central1-todo-6d12f.cloudfunctions.net/api";

let login = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    return headers;
  } catch (err) {
    console.error(err);
  }
  return "";
};

let createTodo = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    let todoRes = await axios.post(
      apiUrl + "/todo",
      {
        name: "new Todo 1",
        description: "just a new todo",
        projectId: "projectId value",
        assignee: "assignee value",
        details: "details value",
        status: "status value",
        priority: "priority value",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(todoRes.status);
    console.log(todoRes.statusText);
    console.log(todoRes.data);
    return todoRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getTodos = async function(headers) {
  try {
    let todoRes = await axios.get(apiUrl + "/todo", { headers: headers });
    console.log(todoRes.status);
    console.log(todoRes.statusText);
    console.log(todoRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getTodoById = async function(headers, id) {
  try {
    let todoRes = await axios.get(apiUrl + "/todo/" + id, {
      headers: headers
    });
    console.log(todoRes.status);
    console.log(todoRes.statusText);
    console.log(todoRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editTodo = async function(headers, id) {
  try {
    let todoRes = await axios.put(
      apiUrl + "/todo/" + id,
      {
        name: "new Todo 2",
        description: "just a new todo edited",
        projectId: "projectId value",
        assignee: "assignee value",
        details: "details value",
        status: "status value",
        priority: "priority value",
        username: "user5"
      },
      {
        headers: headers
      }
    );
    console.log(todoRes.status);
    console.log(todoRes.statusText);
    console.log(todoRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteTodo = async function(headers, id) {
  try {
    let todoRes = await axios.delete(apiUrl + "/todo/" + id, {
      headers: headers
    });
    console.log(todoRes.status);
    console.log(todoRes.statusText);
    console.log(todoRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Todo Run");
  let id = await createTodo(headers);
  console.log("Get Todos Run");
  await getTodos(headers);
  console.log("Get Todo by Id Run");
  await getTodoById(headers, id);
  console.log("Edit Todo Run");
  await editTodo(headers, id);
  console.log("Delete Todo Run");
  await deleteTodo(headers, id);
};

run();
