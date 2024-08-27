require('../models')
const request = require('supertest')
const App = require('../app')
const Product = require('../models/Product')
const Category = require('../models/Category');
const Cart = require('../models/Cart');



const BASE_URL_LOGIN ='/api/v1/users/login';
const BASE_URL='/api/v1/purchase';
let TOKEN;
let Car="";
let id="";
let producto="";
let category="";



beforeAll(async()=>{

    const hits={
        email: "rincon@google.com",
        password: "jrincon123"
    }
  
    const res = await request(App)
    .post(BASE_URL_LOGIN)
    .send(hits)
    
    id = res.body.user.id
    TOKEN= res.body.token;

    
})

const NewObject = {
    userId:1,
    quantity:4,
    productId:1
}
const Productos ={
    title: "samsung galaxy s23",
    description: "teléfono inteligente Android desbloqueado de 256 GB, batería de larga duración, procesador premium, pantalla de vidrio Gorilla resistente, cámara de alta resolución",
    price: 756     
    }
   
const categori = {
    name:"smatPhone"
} 




test("get => BASE_URL should return res.statusCode(201), res.body.userId === id, res.body.productId === prodcuto.id",async()=>{
   category= await Category.create(categori)
   producto = await Product.create(Productos)
   producto.categorieId=category.id; 
   Car = await Cart.create(NewObject)
    
    
    const res = await request(App)
    .post(BASE_URL)
    .set('authorization',`Bearer ${TOKEN}`)


  expect(res.statusCode).toBe(201)
  expect(res.body[0].userId).toBe(Car.userId)
  expect(res.body[0].productId).toBe(producto.id)
})

test("GetAll => BASE_URL should resturn",async()=>{
    const res = await request(App)
    .get(BASE_URL)
    .set('authorization',`Bearer ${TOKEN}`)
    


    expect(res.statusCode).toBe(200)
    expect(res.body[0].userId).toBe(Car.userId)
    expect(res.body[0].productId).toBe(producto.id)
    expect(res.body[0].product.title).toBe(producto.title)  

    await producto.destroy()
    await category.destroy()
    await Car.destroy() 
   
})