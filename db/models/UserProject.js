const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserProject = sequelize.define('UserProject', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Projects',
        key: 'id',
      }
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    porcentaje: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    saldoPagar: {
      type: DataTypes.FLOAT,
      defaultValue: false,
      allowNull: true,
    }
  });

  return UserProject;
};