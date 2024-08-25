const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImg = sequelize.define('product_image', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = ProductImg;