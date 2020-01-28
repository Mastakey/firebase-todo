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

let createProject = async function() {
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
    let projectRes = await axios.post(
      apiUrl + "/project",
      {
        name: "new Project 1",
        description: "just a new project",
        tags: "tags value",
    end: "end value",
    type: "type value",
    start: "start value",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(projectRes.status);
    console.log(projectRes.statusText);
    console.log(projectRes.data);
    return projectRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getProjects = async function(headers) {
  try {
    let projectRes = await axios.get(apiUrl + "/project", { headers: headers });
    console.log(projectRes.status);
    console.log(projectRes.statusText);
    console.log(projectRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getProjectById = async function(headers, id) {
  try {
    let projectRes = await axios.get(apiUrl + "/project/" + id, {
      headers: headers
    });
    console.log(projectRes.status);
    console.log(projectRes.statusText);
    console.log(projectRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editProject = async function(headers, id) {
  try {
    let projectRes = await axios.put(
      apiUrl + "/project/" + id,
      {
        name: "new Project 2",
        description: "just a new project edited",
        tags: "tags value",
    end: "end value",
    type: "type value",
    start: "start value",
        username: "user5"
      },
      {
        headers: headers
      }
    );
    console.log(projectRes.status);
    console.log(projectRes.statusText);
    console.log(projectRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteProject = async function(headers, id) {
  try {
    let projectRes = await axios.delete(apiUrl + "/project/" + id, {
      headers: headers
    });
    console.log(projectRes.status);
    console.log(projectRes.statusText);
    console.log(projectRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Project Run");
  let id = await createProject(headers);
  console.log("Get Projects Run");
  await getProjects(headers);
  console.log("Get Project by Id Run");
  await getProjectById(headers, id);
  console.log("Edit Project Run");
  await editProject(headers, id);
  console.log("Delete Project Run");
  await deleteProject(headers, id);
};

run();