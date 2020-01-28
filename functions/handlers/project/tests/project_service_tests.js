var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-6d12f.firebaseio.com"
});
const db = admin.firestore();

const {
  createProjectService,
  getProjectsService,
  getProjectByIdService,
  editProjectService,
  deleteProjectService
} = require("../project_service");

let createProjectTest = async () => {
  const params = {
    name: "test project",
    description: "test project desc",
    tags: "tags value",
    end: "end value",
    type: "type value",
    start: "start value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createProjectService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getProjectsTest = async () => {
  try {
    const params = {
    };
    const user = {
      username: "user5"
    };
    let resp = await getProjectsService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getProjectByIdTest = async projectId => {
  try {
    const params = {
      projectId: projectId
    };
    let resp = await getProjectByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editProjectTest = async projectId => {
  const params = {
    name: "test project edited",
    description: "test project desc edited",
    projectId: projectId,
    tags: "tags value",
    end: "end value",
    type: "type value",
    start: "start value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editProjectService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteProjectTest = async projectId => {
  const params = {
    projectId: projectId
  };
  try {
    let resp = await deleteProjectService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create Project");
  let projectId = await createProjectTest();
  console.log("Get Projects");
  await getProjectsTest();
  console.log("Get Project by Id");
  await getProjectByIdTest(projectId);
  console.log("Edit Project");
  await editProjectTest(projectId);
  console.log("Delete Project");
  await deleteProjectTest(projectId);
};

run();