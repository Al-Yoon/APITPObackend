const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) =>{
    const Ticket = sequelize.define('Ticket',{ //modelado de la DB, misma estruct que en la tabla
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descripcion: DataTypes.STRING,
        fecha: DataTypes.DATE,
        monto: DataTypes.FLOAT,
        imageUrl:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return Ticket;
}