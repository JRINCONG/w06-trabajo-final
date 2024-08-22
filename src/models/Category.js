const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Categorie = sequelize.define('categorie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Categorie