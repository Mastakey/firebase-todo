const { db } = require("../../util/admin");
const {
  createProjectService,
  getProjectsService,
  getProjectByIdService,
  editProjectService,
  deleteProjectService
} = require("./project_service");

exports.createProject = async (req, res) => {
  try {
    let resp = await createProjectService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getProjects = async (req, res) => {
  try {
    let resp = await getProjectsService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      projectId: req.params.projectId
    };
    let resp = await getProjectByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editProject = async (req, res) => {
  try {
    const params = {
      ...req.body,
      projectId: req.params.projectId
    };
    let resp = await editProjectService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteProject = async (req, res) => {
  const params = {
    projectId: req.params.projectId
  };
  try {
    let resp = await deleteProjectService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};