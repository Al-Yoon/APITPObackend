const {Project} = require('../db/db')

const getProjects = async ()=> await Project.findAll(); //select * from tickets
const getProjectById = async ()=> await Project.findByPk(id); // select * from tickets where id = id
const createProject = async ()=> await Project.create(project); // insert projects tickets values ...

module.exports ={
    getProjects,
    getProjectById,
    createProject,
}