const { db } = require("../../util/admin");
const {
  createTodoService,
  getTodosService,
  getTodoByIdService,
  editTodoService,
  deleteTodoService,
  getTodosByProjectIdService
} = require("./todo_service");

exports.createTodo = async (req, res) => {
  try {
    let resp = await createTodoService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getTodos = async (req, res) => {
  try {
    let resp = await getTodosService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      todoId: req.params.todoId
    };
    let resp = await getTodoByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getTodosByProjectId = async (req, res) => {
  try {
    const params = {
      ...req.body,
      projectId: req.params.projectId
    };
    let resp = await getTodosByProjectIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editTodo = async (req, res) => {
  try {
    const params = {
      ...req.body,
      todoId: req.params.todoId
    };
    let resp = await editTodoService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteTodo = async (req, res) => {
  const params = {
    todoId: req.params.todoId
  };
  try {
    let resp = await deleteTodoService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
