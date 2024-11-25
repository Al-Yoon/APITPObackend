const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserProject = sequelize.define('UserProject', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Projects',
        key: 'id',
      }
    },
    porcentaje: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    pagado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return UserProject;
};