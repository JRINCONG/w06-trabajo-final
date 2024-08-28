require('../models')
const request = require('supertest')
const App = require('../app')
const Categori = require('../models/Category')


let categoria;
const BASE_URL_LOGIN='/api/v1/users/login'
const BASE_URL='/api/v1/products'

let id;
let TOKEN;  


const Product ={
    title: "samsung galaxy s23",
    description: "teléfono inteligente Android desbloqueado de 256 GB, batería de larga duración, procesador premium, pantalla de vidrio Gorilla resistente, cámara de alta resolución",
    price: 7566   
    }

afterAll(async()=>{
 categoria.destroy()
})

beforeAll(async()=>{
    const login ={
        email: "rincon@google.com",
        password: "jrincon123",
    }
    const res = await request(App)
    .post(BASE_URL_LOGIN)
    .send(login)
    
    TOKEN=res.body.token;    
})



test("POST => BASE_URL1, should return res.statusCode(201), res.body.firstName === Product.firstName and res.body.price===Product.price",async()=>{
     categoria = await Categori.create({name:'SmatPhone'})
    Product.categorieId = categoria.id

    //console.log("categoria ",categoria)

    const res = await request(App)
    .post(BASE_URL)
    .send(Product)
    .set('authorization', `Bearer ${TOKEN}`)

    id = res.body.id;


    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(Product.firstName)
    expect(res.body.price).toBe(Product.price)
   
})

test("GetAll => BASE_URL , should return res.statusCode(200) res.body.length === 1, res.body[0].firstName === Product.firstName",async()=>{
    const res= await request(App)
    .get(BASE_URL)



    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].firstName).toBe(Product.firstName)
})

test("GetOne=> BASE_URL/:id, should return res.statusCode(200), res.body.firstName === Product.firstName, res.body.id === id",async()=>{

 const res= await request(App)
 .get(`${BASE_URL}/${id}`)

 //console.log(res)

 expect(res.statusCode).toBe(200)
 expect(res.body).toBeDefined()
 expect(res.body.id).toBe(id)
 expect(res.body.firstName).toBe(Product.firstName)
})

test("PUT => BASE_URL/:id, should return res.statusCode(200), res.body.title === productos.title, and res.body.proce === productos.price",async()=>{
    const productos={
        title: "samsung galaxy sA23",
        price: 85
    }
    const res = await request(App)
    .put(`${BASE_URL}/${id}`)
    .send(productos)
    .set('authorization', `Bearer ${TOKEN}`)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(productos.title)
    expect(res.body.price).toBe(productos.price)
})

test("DELETE => BASE_URL2/:id, should return, res.statusCode(204)",async()=>{
    const res = await request(App)
    .delete(`${BASE_URL}/${id}`)
    .set('authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
    
})