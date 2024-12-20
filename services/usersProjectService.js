const { UserProject } = require("../db/db");
const {Project} = require("../db/db");

const addUser = async (usersProject) => await UserProject.create(usersProject);

const getUsersByProject = async (projectId) => await UserProject.findAll(
    {
        where: {
        projectId: projectId
        }
    }
);

const getProjectsByUser = async(id) => await Project.findAll(
    {
        where: {
        usuarioId: id
        }
    }
);

const removeUserFromProject = async(userId, ProyectId) => await UserProject.destroy({ 
    where: { 
    ProyectId: ProyectId,
    UserId: userId
    } 
});  

module.exports = {
    addUser,
    getUsersByProject,
    getProjectsByUser,
    removeUserFromProject
};