const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Categorie = require('../models/Category');
const ProductImg = require('../models/ProductImg')


const getAll = catchError(async(req, res) => {
    const results = await Product.findAll({
        include:[{
            model:Categorie,
            attributes:['id','name'],
        
        },
        {   model:ProductImg,
           attributes:['url']}
    ]});
    return res.json(results);
});

const create = catchError(async(req, res) => {

    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id,{
        include:[{
            model:Categorie,
            attributes:['id','name']
        }]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});
//POST  /products/:id/images
const setImg = catchError(async(req, res)=>{
    
    const { id } = req.params
       const product = await Product.findByPk(id)
       
       if(!product) return res.sendStatus(404)
           
           await product.setProductImages(res.body)
   
       const imagen = await product.getProductImages()
  
       return res.status(200).json(imagen)
   
   })
   


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setImg
   
}