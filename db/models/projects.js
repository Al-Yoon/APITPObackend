const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) =>{
    const Project = sequelize.define('Projects',{ //modelado de la DB, misma estruct que en la tabla
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        fecha: DataTypes.DATE,
        ticketId:{
            type: DataTypes.INTEGER,
            references: {
                model: 'Projects',
                key: 'id',
            },
        },
        usuarioId:{
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key:'id',
            },
        },
    });
    return Project;
}