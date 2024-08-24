const user = require('../models/User')
const category = require('../models/Category')
const product = require('../models/Product')
const cart = require('../models/Cart')




cart.belongsTo(user)
user.hasMany(cart)

cart.belongsTo(product)
product.hasMany(cart)


product.belongsTo(category)
category.hasMany(product)



