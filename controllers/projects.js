const ProjectService = require('../services/projects');
const path = require('path');
const MailService = require('../services/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const AuthService = require("../services/auth");

class PorjectController{
    async getProjects(req,res){
        try{
            const projects = await ProjectService.getProjects();
            return res.status(200).json(projects);
        } catch(err){
            console.error(err)
            return res.status(500).json({
                method: "getProjects",
                message: err
            });
        }
    };
    
    async getProjectById(req,res){
        try{
            const{id} = req.params.id;
            let project = await ProjectService.getProjectsById(Number(id));
            if(!project){
                return res.status(404).json({
                    method: "getProjectById",
                    message: "Project not found"
            });
            }
            return res.status(200).json(project);
        }catch(err){
            console.log(err);
            return res.status(500).json({
                method: "getProjectById",
                message: err,
            });
        }
    };
    
        async createProject(req,res){
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
    
            return res.status(201).json(
                aggregatedProject
            );
        } catch(err){
            console.error(err);
            return res.status(500).json({
                method: "createProject",
                message: err
            });
        }
    };

    async updateProject(req,res){
        try{
            let project = await ProjectService.getProjectById(req.params.id);
            if(!project){
                return res.status(404).json(
                    {
                        method: "updateProject",
                        message: "Project not found"
                    }
                )
            }
            const modifiedProject = await ProjectService.updateProject(
                req.params.id,
                req.body,
                project
            );
            return res.status(200).json(modifiedProject);
        } catch(err){
            console.error(err);
            return res.status(500).json({
                method:"updateProduct",
                message: err
            });
        }
    }

    async deleteProject(req,res){
        try{
            let isProject = await ProjectService.deleteProject(req.params.id);
            if(isProject){
                await ProjectService.deleteProject(req.params.id);
                return res.status(204).json({
                    message: "Project deleted"
                });
            }
            return res.status(404).json({
                message: "Project not found"
            });
            }catch(err){
                console.error(err);
                return res.status(500).json({
                    method: "deleteProject",
                    message: err
                })
            }
    }
}

module.exports = new PorjectController();