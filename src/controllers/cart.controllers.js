const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const User = require('../models/User')
const Product = require('../models/Product')
const Category = require('../models/Category')

const getAll = catchError(async(req, res) => {
 
    const results = await Cart.findAll({where:{userId:req.user.id},
        include:[{
        model:Product,
        attributes:{exclude:['updatedAt','createdAt']},

        include:[{
            model:Category,
            attributes:['name','id']
        }]
    }]
});
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
    const result = await Cart.findByPk(id,{
        include:[{
            model:Product,
            attributes:{exclude:['updatedAt','createdAt']},
            include:[{
                model:Category,
                attributes:['name','id']
            }]

        }]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.destroy({ where: {id,userId:req.user.id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204).json({"message":"Delete Cart"});
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
   
   for(let valor  in req.body){
     delete req.body.userId
     delete req.body.productId
   }
    const result = await Cart.update(req.body,{ where: {id,userId:req.user.id}, returning: true }
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