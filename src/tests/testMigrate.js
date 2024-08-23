require('../models')
const sequelize = require("../utils/connection");
const userCreate = require("./CreateData/userCreate");

const testMigrate = async()=>{

    try{
        await sequelize.sync({force:true})
        await userCreate()
        console.log('DB reset ✅');
        process.exit()
    }catch(error){
        console.error(error);
    }
}


testMigrate()