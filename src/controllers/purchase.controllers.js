const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart  = require('../models/Cart')
const Product = require('../models/Product')
const Category = require('../models/Category')

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({where:{userId:req.user.id},
           
            include:[{
            model:Product,
            attributes:{exclude:['createdAt','updatedAt']},
        
            include:[{
                model:Category,
                attributes:['name','id']

                    }],
            }],   
   
        })
        
 if(results.length === 1){
     for(let valor in results[0].dataValues){
         delete results[0].dataValues.createdAt,
         delete results[0].dataValues.updatedAt
     }
     return res.status(200).json(results);
 }
 return res.status(404).json({"message":"has no record"});
});

const create = catchError(async(req, res) => {
        
    const ResultCart = await Cart.findAll({where:{userId: req.user.id},
        raw:true,
        attributes:['userId','productId','quantity'] 

})
   if(!ResultCart) return res.sendStatus(404)

   const result = await Purchase.bulkCreate(ResultCart);

   await Cart.destroy({where:{userId:req.user.id}})
   
   return res.status(201).json(result)
});



module.exports = {
    getAll,
    create,
    
}