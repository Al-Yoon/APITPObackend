const { UsersProject } = require("../db/db");

const addUser = async (usersProject) => await UsersProject.create(usersProject);//ver este parametro
const getUsersByProject = async (projectId) => await UsersProject.findAll(
    {
        where: {
        proyectId: projectId
        },
        attributes: ['id'],
    }
);

const getProjectsByUser = async(id) => await UsersProject.findAll(
    {
        where: {
        id: id
        },
        attributes: ['projectId'],
    }
);

const removeUser = async(id, proyectId) => await UsersProject.destroy({ 
    where: { 
    proyectId: proyectId,
    id: id
    } 
}); 

module.exports = {
    addUser,
    getUsersByProject,
    getProjectsByUser,
    removeUser
};