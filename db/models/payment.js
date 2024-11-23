const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) =>{
    const Payment = sequelize.define('Payments',{ //modelado de la DB, misma estruct que en la tabla
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        porcentaje: DataTypes.FLOAT
    });
    return Payment;
}