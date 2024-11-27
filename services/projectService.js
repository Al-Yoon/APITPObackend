const { Project, User, UserProject, Ticket } = require('../db/db');

// Llamar a todos los proyectos, incluyendo los usuarios y tickets asociados
const getProjects = async () => await Project.findAll({
  include: [
    {
      model: User,
      as: 'users',
      through: {
        attributes: ['porcentaje', 'pagado'],
      },
    },
    {
      model: Ticket,
      as: 'tickets',
    }
  ]
});

// Obtener un proyecto por su ID, con sus tickets y usuarios
const getProjectById = async (id) => await Project.findByPk(id, {
  include: [
    {
      model: User,
      as: 'users',
      through: {
        attributes: ['porcentaje', 'pagado'],// Atributos de UserProject
      },
    },
    {
      model: Ticket,
      as: 'tickets',
    }
  ]
});

const createProject = async (project) => await Project.create(project);
const updateProject = async (id, project) => await Project.update(project, { where: { id } });
const deleteProject = async (id) => await Project.destroy({ where: { id } });

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};