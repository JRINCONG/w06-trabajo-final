require('../models')
const App = require('../app')
const request = require('supertest')
const User = require('../models/User')
const Product = require('../models/Product')



const cart ={
    quantity:8
}



const productosObje ={
    title: "samsung galaxy s23",
    description: "teléfono inteligente Android desbloqueado de 256 GB, batería de larga duración, procesador premium, pantalla de vidrio Gorilla resistente, cámara de alta resolución",
    price: 756     
    }

const BASE_URL_LOGIN='/api/v1/users/login';
const BASE_URL='/api/v1/cart'
let TOKEN;
let usuario;
let producto;
let id;
let IdUser;

afterAll(async()=>{
    await producto.destroy()
    })

   beforeAll(async()=>{

    const HIST={
        email: "rincon@google.com",
        password: "jrincon123"
    }

    const res = await request(App)
    .post(BASE_URL_LOGIN)
    .send(HIST)
    
   IdUser= res.body.user.id
    TOKEN= res.body.token;
       
})

test("POST => BASE_URL,  should return res.statusCode(201), res.body.userId === usuario.id and res.body.productId === producto.id",async()=>{
    
     producto = await Product.create(productosObje);
      cart.userId = IdUser;
      cart.productId = producto.id; 
  
    const res = await request(App)
    .post(BASE_URL)
    .send(cart)
    .set('authorization', `Bearer ${TOKEN}`)
  

   

    id=res.body.id;
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.userId).toBe(IdUser)
    expect(res.body.productId).toBe(producto.id)
})

test("GetAll => BASE_URL, should retur res.body.length === 1, res.body[0].product.id === producto.id",async()=>{
     const res = await request(App)
     .get(BASE_URL)
     .set('authorization', `Bearer ${TOKEN}`)

     
     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body[0].userId).toBe(IdUser)
     expect(res.body[0].product.id).toBe(producto.id)
})

test("GetOne => BASE_URL/:id, should return res.satusCode(200) res.body.id === id, res.body.user.firstName === usuario.firstName, res.boy.product.title === producto.title",async()=>{
  const res= await request(App)
  .get(`${BASE_URL}/${id}`)
  .set('authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.id).toBe(id)
  expect(res.body.userId).toBe(IdUser)
  expect(res.body.product.title).toBe(producto.title)
})

test("PUT => BASE_URL/:id, should return res.satusCode(200), res.body.quantity === cart.quantity",async()=>{

    cart.quantity=25;
    const res = await request(App)
    .put(`${BASE_URL}/${id}`)
    .send(cart)
    .set('authorization', `Bearer ${TOKEN}`)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
})

test("DELETE => BASE_URL/:id, should return, res.statusCode(204)",async()=>{
    const res = await request(App)
    .delete(`${BASE_URL}/${id}`)
    .set('authorization', `Bearer ${TOKEN}`)


    expect(res.statusCode).toBe(204)
})