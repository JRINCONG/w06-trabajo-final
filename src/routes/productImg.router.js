const { getAll, remove, create} = require('../controllers/productimg.controllers')
const { verifyJWT } = require('../utils/verifyJWT');
const upload = require('../utils/multer')
const express = require('express');


const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(getAll)
    .post(upload.single('image'), create)


routerProductImg.route('/:id')
    .delete(remove)
    

module.exports = routerProductImg;