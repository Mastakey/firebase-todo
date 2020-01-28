var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-6d12f.firebaseio.com"
});
const db = admin.firestore();

const {
  createTodoService,
  getTodosService,
  getTodoByIdService,
  editTodoService,
  deleteTodoService,
  getTodosByProjectIdService
} = require("../todo_service");

let createTodoTest = async () => {
  const params = {
    name: "test todo",
    description: "test todo desc",
    projectId: "projectId value",
    assignee: "assignee value",
    details: "details value",
    status: "status value",
    priority: "priority value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createTodoService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getTodosTest = async () => {
  try {
    const params = {};
    const user = {
      username: "user5"
    };
    let resp = await getTodosService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getTodoByIdTest = async todoId => {
  try {
    const params = {
      todoId: todoId
    };
    let resp = await getTodoByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editTodoTest = async todoId => {
  const params = {
    name: "test todo edited",
    description: "test todo desc edited",
    todoId: todoId,
    projectId: "projectId value",
    assignee: "assignee value",
    details: "details value",
    status: "status value",
    priority: "priority value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editTodoService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteTodoTest = async todoId => {
  const params = {
    todoId: todoId
  };
  try {
    let resp = await deleteTodoService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getTodoByProjectIdServiceTest = async () => {
  const params = {
    projectId: "4jOfLfzb0vUIptM0mBo1"
  };
  try {
    let resp = await getTodosByProjectIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create Todo");
  let todoId = await createTodoTest();
  console.log("Get Todos");
  await getTodosTest();
  console.log("Get Todo by Id");
  await getTodoByIdTest(todoId);
  console.log("Edit Todo");
  await editTodoTest(todoId);
  console.log("Delete Todo");
  await deleteTodoTest(todoId);
  console.log("Get Todos by ProjectId")
  await getTodoByProjectIdServiceTest();
};

run();
