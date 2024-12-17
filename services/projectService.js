const {Project} = require("../db/db");

const getProjects = async () => await Project.findAll(); //esto es gracias a sequelize
const getProjectById = async (id) => await Project.findByPk(id);
const createProject = async (project) => await Project.create(project);
const updateProject = async(project,id) => await Project.update(
  project,{
        where:{
            id
        }
    }
);
const deleteProject = async(id) => await Project.destroy({where: {id}});

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
