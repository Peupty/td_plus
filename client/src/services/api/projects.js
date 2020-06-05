const sendProjects = http => (projects, token) => {
  return http({
    method: 'post',
    url: '/api/projects/import',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: {
      projects,
    },
  });
};

const fetchActiveProject = http => (token, id) =>
  http({
    method: 'get',
    url: `/api/projects/active/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const updateProject = http => (id, changes) =>
  http({
    method: 'post',
    url: `/api/projects/${id}`,
    headers: {
      Authorization: `Bearer ${rootState.auth.token}`,
      'Content-Type': 'application/json',
    },
    data: {
      project: changes,
    },
  });

const create = http => (token, data) =>
  http({
    method: 'post',
    url: '/api/projects/create',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: {
      project: data,
    },
  });

const fetchAllProjects = http => (token, id) =>
  http({
    method: 'get',
    url: `/api/projects/all/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const isAdmin = http => (token, id) =>
  http({
    method: 'get',
    url: `/api/projects/${id}/admin`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const deleteProject = http => (token, id) =>
  http({
    method: 'delete',
    url: `/api/projects/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const removeUser = http => () => http({});

export default http => ({
  import: sendProjects(http),
  fetchActiveProject: fetchActiveProject(http),
  updateProject: updateProject(http),
  create: create(http),
  fetchAllProjects: fetchAllProjects(http),
  isAdmin: isAdmin(http),
  delete: deleteProject(http),
});
