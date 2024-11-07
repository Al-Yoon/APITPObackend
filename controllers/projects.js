const ProjectService = require('../services/projects');
const path = require('path');
const MailService = require('../services/mail');
const ProjectService = require('../services/projects');
const handlebars = require('handlebars');
const fs = require('fs');

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

        //template del html -Handlebars
        const templatePath = path.resolve(__dirname, '../templates/email.template.hbs');
        const aggregatedProject = await ProjectService.getProjectById(project.id);
        const templateSource = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(templateSource);

        const htmlContent = template({
            proyecto: aggregatedProject.title,
            nombreRemitente: aggregatedProject.usuarioId,
            descripcion: aggregatedProject.descripcion,
            fecha: aggregatedProject.fecha
        });

        //4 El mail
        await MailService.sendMail(
            aggregatedProject.usuarioId.email,//el mail del q creo el proyecto
            `Tu invitación ${aggregatedProject.title} se ha enviado correctamente!`,
            htmlContent)

        res.status(201).json(aggregatedProject);
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