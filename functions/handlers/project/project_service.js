const { validateName } = require("./project_validators");

exports.createProjectService = async (db, params, user) => {
  try {
    let date = new Date();
    const newProject = {
      name: params.name,
      description: params.description,
      username: user.username,
      tags: params.tags,
      end: params.end,
      type: params.type,
      start: params.start,
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
    let project = await db.collection("project").add(newProject);
    let resp = newProject;
    resp.id = project.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createProjectService";
    throw err;
  }
};

exports.getProjectsService = async (db, params, user) => {
  try {
    let allProjects = await db
      .collection("project")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let projects = [];
    allProjects.forEach(doc => {
      projects.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: projects };
  } catch (err) {
    err.function = "getProjectsService";
    throw err;
  }
};

exports.getProjectByIdService = async (db, params, user) => {
  try {
    let project = await db
      .collection("project")
      .doc(params.projectId)
      .get();
    if (!project.exists) {
      return { status: 404, response: { error: "project not found" } };
    }
    return { status: 200, response: { ...project.data(), id: project.id } };
  } catch (err) {
    err.function = "getProjectByIdService";
    throw err;
  }
};

exports.editProjectService = async (db, params, user) => {
  try {
    let date = new Date();
    const editProject = {
      name: params.name,
      description: params.description,
      username: user.username,
      tags: params.tags,
      end: params.end,
      type: params.type,
      start: params.start,
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
      throw { error: validationErrors, function: "createTodoService" };
    }

    let project = await db.doc(`/project/${params.projectId}`).get();
    if (!project.exists) {
      return { status: 404, response: { error: "project not found" } };
    }
    await project.ref.update(editProject);
    return { status: 200, response: editProject };
  } catch (err) {
    err.function = "editProjectService";
    throw err;
  }
};

exports.deleteProjectService = async (db, params, user) => {
  try {
    const project = db.doc(`/project/${params.projectId}`);
    const doc = await project.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "project not found" } };
    }
    await project.delete();
    return { status: 200, response: { id: doc.id, message: "project deleted" } };
  } catch (err) {
    err.function = "deleteProjectService";
    throw err;
  }
};