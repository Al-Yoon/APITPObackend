const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fecha: DataTypes.DATE,
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    saldoPagado: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    saldoRestante: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  });

  return Project;
};