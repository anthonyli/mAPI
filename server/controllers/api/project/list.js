const ProjectDaos = require('daos/project')

module.exports = async ctx => {
  const projectDaos = new ProjectDaos()

  ctx.user.id = 1

  const projects = await projectDaos.getProjectList(ctx)

  ctx.body = { code: 0, data: projects }
}
