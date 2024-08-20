const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getAll = catchError(async(req, res) => {
   // console.log('llego...',req.body)
    const results = await User.findAll();
    results.forEach((x)=>{    
          delete x.dataValues.email
          delete x.dataValues.password     
         console.log(x)
    })

   return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});



const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    let newObject={}
    let newResult={}
    for(let valor in req.body){
        if(req.body.email !="" || req.body.password !=""){
            newObject={
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone
            }
       
        }else if(req.body.email==="" || req.body.password ===""){
            newObject={
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone
            }
        }
    }    
    const result = await User.update( newObject, { where: {id}, returning: true });
    console.log("este es result",result[1][0])
    if(result[0] === 0) return res.sendStatus(404);
    for( let valor in result[1][0]){
        newResult={
        firstName: result[1][0].firstName,
        lastName: result[1][0].lastName,
        phone: result[1][0].phone
        }
    }
    return res.json(newResult);
});

const login = catchError(async(req, res) => {
    const {password, email} = req.body

    const user = await User.findOne({where: {email}})
    if(!user) return res.status(401).json({"message": "invalid credentials"})

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({"message": "invalid credentials"})
 
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn: '1d'}

    )

    return res.status(200).json({user, token})


}); 

const logged = catchError(async(req, res)=> {
    const user = req.user
    return res.json(user)
});



module.exports = {
    getAll,
    create,
    remove,
    update,
    login
}