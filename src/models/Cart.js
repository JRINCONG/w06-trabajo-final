const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Carts = sequelize.define('cart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
          
    },
});

module.exports = Carts;
