const user = require('../models/User')
const category = require('../models/Category')
const product = require('../models/Product')
const cart = require('../models/Cart')
const Purchase = require('../models/Purchase')
const ProductImg = require('../models/ProductImg')



cart.belongsTo(user)
user.hasMany(cart)

cart.belongsTo(product)
product.hasMany(cart)



product.belongsTo(category)
category.hasMany(product)


Purchase.belongsTo(user)
user.hasMany(Purchase)

Purchase.belongsTo(product)
product.hasMany(Purchase)

ProductImg.belongsTo(product)
product.hasMany(ProductImg)


