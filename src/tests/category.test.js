const App = require('../app')
const request= require('supertest')

let idCategory;

const categori = {
    name:"smatPhone"
}

const BASE_URL_LOGIN='/api/v1/users/login'
const BASE_URL='/api/v1/categories'
let TOKEN;

beforeAll(async()=>{
    const login={
        email: "rincon@google.com",
        password: "jrincon123",
    }        
    const res = await request(App)
    .post(BASE_URL_LOGIN)
    .send(login)
    TOKEN = res.body.token;   
})


test("POST BASE_URL2, should return res.statusCode(201), res.body.name === categori.name ",async()=>{
    const res=await request(App)
    .post(BASE_URL)
    .send(categori)
    .set('authorization',`Bearer ${TOKEN}`)
 
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(categori.name)
})

test("GET => BASE_URL2 ,should return res.statusCode(200) res.body.length === 1",async()=>{
    const res = await request(App)
    .get(BASE_URL)

    idCategory = res.body[0].id

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(categori.name)

})

test("DELETE => BASE_URL2,should, return res.statusCode(204",async()=>{
    const res = await request(App)
    .delete(`${BASE_URL}/${idCategory}`)
    .set('authorization',`Bearer ${TOKEN}`)
  
    expect(res.statusCode).toBe(204)
})