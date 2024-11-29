const { Sequelize } = require('sequelize');
const UserModel = require('./models/User');
const ProjectModel = require('./models/Project');
const UserProjectModel = require('./models/UserProject');
const TicketModel = require('./models/Ticket');
const dotenv = require('dotenv');
dotenv.config();

// Conexión del ORM a la DB - usando .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

// Inicialización de modelos
const User = UserModel(sequelize);
const Project = ProjectModel(sequelize);
const UserProject = UserProjectModel(sequelize);
const Ticket = TicketModel(sequelize);

// Definir relaciones
User.belongsToMany(Project, { through: UserProject, foreignKey: 'userId', onDelete: 'CASCADE' });
Project.belongsToMany(User, { through: UserProject, foreignKey: 'projectId', onDelete: 'CASCADE' });

User.hasMany(Project);
Project.belongsTo(User);

Project.hasMany(Ticket, {
  foreignKey: 'projectId',
  sourceKey: 'id',
  onDelete: 'CASCADE'
});

Ticket.belongsTo(Project, {
  foreignKey: 'projectId',
  targetKey: 'id',
  onDelete: 'CASCADE',
  as: 'project'
});

// Método para sincronizar
sequelize.sync()
  .then(() => {
    console.log('Database & Tables created');
  })
  .catch(err => {
    console.log('Error ', err);
  });

module.exports = {
  sequelize,
  User,
  Project,
  UserProject,
  Ticket
};