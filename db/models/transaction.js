const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) =>{
    const Transaction = sequelize.define('Transactions',{ //modelado de la DB, misma estruct que en la tabla
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        
    });
    return Transaction;
}