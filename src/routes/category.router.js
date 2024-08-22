const { getAll, create, remove } = require('../controllers/category.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerCategorie = express.Router();

routerCategorie.route('/')
    .get(getAll)
    .post(verifyJWT, create);

routerCategorie.route('/:id')

    .delete(verifyJWT, remove)


module.exports = routerCategorie;