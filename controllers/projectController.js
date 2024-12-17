const ProjectService = require('../services/projectService');
const path = require('path');
const MailService = require('../services/mailService');
const handlebars = require('handlebars');
const fs = require('fs');

class ProjectController {
  async getProjects(req, res) {
    try {
      const projects = await ProjectService.getProjects();
      return res.status(200).json(projects);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getProjects",
        message: err
      });
    }
  }

  async getProjectById(req, res) {
    try {
      const { id } = req.params;
      let project = await ProjectService.getProjectById(Number(id));
      if (!project) {
        return res.status(404).json({
          method: "getProjectById",
          message: "Project not found"
        });
      }
      return res.status(200).json(project);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        method: "getProjectById",
        message: err,
      });
    }
  }

  async createProject(req, res) {
    try {
      const project = await ProjectService.createProject(req.body);
      return res.status(201).json(project);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createProject",
        message: err
      });
    }
  }

  async updateProject(req,res){
    const{
        id
    } = req.params;
    try{
        const project = await ProjectService.updateProject(req.body,Number(id));
        res.status(200).json(project);
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

  async deleteProject(req, res) {
    try {
      let isProject = await ProjectService.getProjectById(req.params.id);
      if (isProject) {
        await ProjectService.deleteProject(req.params.id);
        return res.status(204).json({
          message: "Project deleted",
        });
      }
      return res.status(404).json({
        message: "Project not found",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteProject",
        message: err,
      });
    }
  }

  async notify(req, res) {
    try {
      const { projectId, userId } = req.body;
      const project = await ProjectService.getProjectById(projectId);
      const user = await UserService.getUserById(userId);

      if (!project || !user) {
        return res.status(404).json({
          message: "Project or User not found"
        });
      }

      // template del html - Handlebars
      const templatePath = path.resolve(__dirname, '../templates/email.template.hbs');
      const templateSource = fs.readFileSync(templatePath, 'utf8');
      const template = handlebars.compile(templateSource);

      const htmlContent = template({
        proyecto: project.nombre,
        nombreRemitente: user.nombre,
        descripcion: project.descripcion,
        fecha: project.fecha
      });

      // Enviar el mail
      await MailService.sendMail(
        user.email, // el mail del usuario notificado
        `Notificación de proyecto: ${project.nombre}`,
        htmlContent
      );

      return res.status(200).json({
        message: "Notification sent successfully"
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "notify",
        message: err,
      });
    }
  }
}

module.exports = new ProjectController();