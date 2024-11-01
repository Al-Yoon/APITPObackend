const ProjectService = require('../services/projects');

const getProjects = async(req,res) =>{
    try{
        const projects = await ProjectService.getProjects();
        res.status(200).json(projects);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

const getProjectById = async(req,res) =>{
    const{
        id
    } = req.params;
    try{
        const project = await ProjectService.getProjectsById(Number(id));
        if(!project) res.status(404).json({
            message: "Porject Not Found"
        });
        res.status(200).json(project);
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

    const createProject = async(req,res) =>{
    try{
        const project = await ProjectService.createProject(req.body);
            res.status(200).json(project);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports ={
    getProjects,
    getProjectById,
    createProject
}