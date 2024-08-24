const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const User = require('../models/User')
const Product = require('../models/Product')

const getAll = catchError(async(req, res) => {
   console.log(req.user.id)
    const results = await Cart.findAll({where:{userId:req.user.id},include:[User, Product]});
   //{where:{userId:req.user.id}, include:[User, Product]}
    
    if(!results) return res.json({"messege":"empty cart"})
    return res.json(results);
});

const create = catchError(async(req, res) => {
    for(let valor in req.body){
        delete req.body.userId
    }
    const result = await Cart.create({...req.body, userId:req.user.id});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.findByPk(id,{include:[User, Product]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204).json({"message":"Delete Cart"});
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
   console.log(req.body)
   for(let valor  in req.body){
     delete req.body.userId
     delete req.body.productId
   }
    const result = await Cart.update(req.body,{ where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}