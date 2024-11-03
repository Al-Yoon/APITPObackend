const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) =>{
    const User = sequelize.define('Users',{ //modelado de la DB, misma estruct que en la tabla
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        email: DataTypes.STRING,
        contrasenia: DataTypes.STRING
    });
    return User;
}