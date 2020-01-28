const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
app.use(cors());

const {
  signUp,
  login,
  getAuthenticatedUser,
  getUserDetails
} = require("./handlers/users");

const {
  createProject,
  getProjects,
  getProjectById,
  editProject,
  deleteProject
} = require("./handlers/project/project_controller");

const {
  createTodo,
  getTodos,
  getTodoById,
  editTodo,
  deleteTodo
} = require("./handlers/todo/todo_controller");

//User routes
app.post("/signup", signUp);
app.post("/login", login);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);

//Project routes
app.post("/project", FBAuth, createProject);
app.get("/project", FBAuth, getProjects);
app.get("/project/:projectId", FBAuth, getProjectById);
app.put("/project/:projectId", FBAuth, editProject);
app.delete("/project/:projectId", FBAuth, deleteProject);

//Todo routes
app.post("/todo", FBAuth, createTodo);
app.get("/todo", FBAuth, getTodos);
app.get("/todo/:todoId", FBAuth, getTodoById);
app.put("/todo/:todoId", FBAuth, editTodo);
app.delete("/todo/:todoId", FBAuth, deleteTodo);

exports.api = functions.https.onRequest(app);
