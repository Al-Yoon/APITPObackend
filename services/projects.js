const {Project, User, Ticket} = require('../db/db')

const getProjects = async ()=> await Project.findAll(); //select * from tickets
const getProjectById = async ()=> await Project.findByPk(id); // select * from tickets where id = id
const createProject = async ()=> await Project.create(project); // insert projects tickets values ...
const updateProject = async ()=> await Project.updateProject(id);
const deleteProject = async ()=> await Project.deleteProject(id);

module.exports ={
    getProjects,
    getProjectById,
    createProject,
}