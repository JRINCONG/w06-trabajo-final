const { getAll, create, remove } = require('../controllers/categorie.controllers');
const express = require('express');

const routerCategorie = express.Router();

routerCategorie.route('/')
    .get(getAll)
    .post(create);

routerCategorie.route('/:id')

    .delete(remove)


module.exports = routerCategorie;