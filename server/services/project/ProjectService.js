const { create } = require('../common')

const find = Project => id => {
  if (!id) {
    throw new Error('Id was not provided!')
  }

  return Project.findById(id)
}

const isMember = (project, userId) => {
  if (!userId || !project) {
    throw new Error('Missing function argument(s)!')
  }

  return Boolean(project.members.map(el => el.id).find(el => userId.equals(el)))
}

const isAdmin = (project, userId) => {
  if (!project || !userId) {
    throw new Error('Missing function argument(s)!')
  }

  return project.admin == userId
}

const addMember = (project, userId) => {
  project.members.push(userId)

  return project.save()
}

const findMany = Project => async projects => {
  records = await Project.find({}, 'name members password admin')
    .where('_id')
    .in(projects)
    .exec()

  return records
}

const deleteProject = Project => async (projectId, cb) => {
  if (!projectId) {
    throw new Error('Missing argument!')
  }
  return await Project.findByIdAndRemove(projectId, cb)
}

const update = Project => (projectId, project) => {
  return Project.findByIdAndUpdate(projectId, project)
}

module.exports = Project => {
  return {
    createProject: create(Project),
    find: find(Project),
    isMember: isMember,
    isAdmin: isAdmin,
    addMember: addMember,
    findMany: findMany(Project),
    delete: deleteProject(Project),
    update: update(Project),
  }
}
