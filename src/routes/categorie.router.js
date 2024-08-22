const { getAll, create, getOne, remove, update } = require('../controllers/categorie.controllers');
const express = require('express');

const routerCategorie = express.Router();

routerCategorie.route('/')
    .get(getAll)
    .post(create);

routerCategorie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerCategorie;