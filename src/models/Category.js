const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Category = sequelize.define('categorie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


module.exports = Category