const User = require('../../models/User')


const userCreate = async()=>{

    const user = {
        firstName: "jairo",
        lastName: "rincon",
        email: "rincon@google.com",
        password: "jrincon123",
        phone: "123654789"
    }

await User.create(user)
}

module.exports = userCreate;