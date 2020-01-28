const { validateName } = require("./todo_validators");

exports.createTodoService = async (db, params, user) => {
  try {
    let date = new Date();
    const newTodo = {
      name: params.name,
      description: params.description,
      username: user.username,
      projectId: params.projectId,
      assignee: params.assignee,
      details: params.details,
      status: params.status,
      priority: params.priority,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };

    //validation
    let validationErrors = [];

    //Name
    const nameValidation = validateName(params.name);
    if (!nameValidation.valid) {
      validationErrors.push(nameValidation);
    }

    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "createTodoService" };
    }

    let todo = await db.collection("todo").add(newTodo);
    let resp = newTodo;
    resp.id = todo.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createTodoService";
    throw err;
  }
};

exports.getTodosService = async (db, params, user) => {
  try {
    let allTodos = await db
      .collection("todo")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let todos = [];
    allTodos.forEach(doc => {
      todos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: todos };
  } catch (err) {
    err.function = "getTodosService";
    throw err;
  }
};

exports.getTodoByIdService = async (db, params, user) => {
  try {
    let todo = await db
      .collection("todo")
      .doc(params.todoId)
      .get();
    if (!todo.exists) {
      return {
        status: 404,
        response: { error: "todo not found", function: "getTodoByIdService" }
      };
    }
    return { status: 200, response: { ...todo.data(), id: todo.id } };
  } catch (err) {
    err.function = "getTodoByIdService";
    throw err;
  }
};

exports.editTodoService = async (db, params, user) => {
  try {
    let date = new Date();
    const editTodo = {
      name: params.name,
      description: params.description,
      username: user.username,
      projectId: params.projectId,
      assignee: params.assignee,
      details: params.details,
      status: params.status,
      priority: params.priority,
      updatedAt: date.toUTCString(),
      updatedAtTimestamp: date.getTime()
    };

    //validation
    let validationErrors = [];

    //Name
    const nameValidation = validateName(params.name);
    if (!nameValidation.valid) {
      validationErrors.push(nameValidation);
    }

    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "editTodoService" };
    }

    let todo = await db.doc(`/todo/${params.todoId}`).get();
    if (!todo.exists) {
      return {
        status: 404,
        response: { error: "todo not found", function: "editTodoService" }
      };
    }
    await todo.ref.update(editTodo);
    return { status: 200, response: editTodo };
  } catch (err) {
    err.function = "editTodoService";
    throw err;
  }
};

exports.deleteTodoService = async (db, params, user) => {
  try {
    const todo = db.doc(`/todo/${params.todoId}`);
    const doc = await todo.get();
    if (!doc.exists) {
      return {
        status: 404,
        response: { error: "todo not found", function: "deleteTodoService" }
      };
    }
    await todo.delete();
    return { status: 200, response: { id: doc.id, message: "todo deleted" } };
  } catch (err) {
    err.function = "deleteTodoService";
    throw err;
  }
};
