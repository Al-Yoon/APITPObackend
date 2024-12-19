const { UsersProject } = require("../db/db");
const {Project} = require("../db/db");

const addUser = async (usersProject) => await UsersProject.create(usersProject);//ver este parametro
const getUsersByProject = async (projectId) => await UsersProject.findAll(
    {
        where: {
        proyectId: projectId
        },
        attributes: ['id'],
    }
);

const getProjectsByUser = async(id) => await Project.findAll(
    {
        where: {
        usuarioId: id
        }
    }
);

const removeUserFromProyect = async(userId, ProyectId) => await UsersProject.destroy({ 
    where: { 
      ProyectId: ProyectId,
      UserId: userId
    } 
  });  

module.exports = {
    addUser,
    getUsersByProject,
    getProjectsByUser,
    removeUserFromProyect
};