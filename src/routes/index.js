const express = require('express');
const routerUser = require('./user.router');
const routerCategorie = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const { verifyJWT } = require('../utils/verifyJWT');
const routerProductImg = require('./productImg.router');
const router = express.Router();

// colocar las rutas aquí

router.use('/users', routerUser)
router.use('/categories', routerCategorie)
router.use('/products', routerProduct)
router.use('/cart', routerCart)
router.use('/purchase', routerPurchase)
router.use('/product_images',verifyJWT, routerProductImg)

module.exports = router;