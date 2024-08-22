const App = require('../app')
const request= require('supertest')

let idCategory;

const categori={
    name:"smatPhone"
}

const BASE_URL1='/api/v1/users'
const BASE_URL2='/api/v1/categories'
let TOKEN;

beforeAll(async()=>{
    const login={
        email: "rincon@google.com",
        password: "jrincon123",
    }        
    const res = await request(App)
    .post(`${BASE_URL1}/login`)
    .send(login)
    TOKEN = res.body.token;

   
})


test("POST BASE_URL2, should return res.statusCode(201)",async()=>{
    const res=await request(App)
    .post(BASE_URL2)
    .send(categori)
    .set('authorization',`Bearer ${TOKEN}`)

    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
})

test("GET => BASE_URL2 ,should return res.statusCode(200) res.body.length === 1",async()=>{
    const res = await request(App)
    .get(BASE_URL2)

    idCategory=res.body[0].id

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(categori.name)

})

test("DELETE => BASE_URL2,should, return res.statusCode(204",async()=>{
    const res = await request(App)
    .delete(`${BASE_URL2}/${idCategory}`)
    .set('authorization',`Bearer ${TOKEN}`)
  console.log(res)
    expect(res.statusCode).toBe(204)
})