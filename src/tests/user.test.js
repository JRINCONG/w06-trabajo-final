const request = require('supertest')
const App = require('../app')


const user = {
    firstName: "jairo",
    lastName: "rincon",
    email: "rincon@google.com",
    password: "jrincon123",
    phone: "123654789"
}
const login={
    email: "rincon@google.com",
    password: "jrincon123",

}
let token;
const BASE_URL='/api/v1/users';

test("POST GetAll => BASE_URL should, return res.statusCode(201), res.body.firstName===user.firstName ",async()=>{
    const res= await request(App)
    .post(BASE_URL)
    .send(user)

  

    expect(res.statusCode).toBe(201)
    expect(res.body.firstName).toBe(user.firstName)
    expect(res.body).toBeDefined()

})


test("POST  Login => BASE_URL/login, should, returns res.statusCode(200), res.body.email===user.email",async()=>{
    const res= await request(App)
    .post(`${BASE_URL}/login`)
    .send(login)

    token = res.body.token;
   
 
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(user.email)
})


test("GET GetAll => BASE_URL , should return res.statusCode(200), res.body.length === 1, res.body.firstName === user.firstName",async()=>{

    const res = await request(App)
    .get(BASE_URL)
    .set('authorization',`Bearer ${token}`)

    console.log('res del test',res)
    expect(res.statusCode).toBe(200)
})

