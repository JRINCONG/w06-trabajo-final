const request = require('supertest')
const App = require('../app')
let token2;
let token;


const BASE_URL='/api/v1/users';

const user = {
    firstName: "andres",
    lastName: "rincon",
    email: "andres@google.com",
    password: "andres123",
    phone: "1236547567889"
}
const login={
    email: "andres@google.com",
    password: "andres123",
}
let id;
//antes de todo adquirir el token HOOK
        beforeAll(async()=>{
            const login={
                email: "rincon@google.com",
                password: "jrincon123",
            }        
            const res = await request(App)
            .post(`${BASE_URL}/login`)
            .send(login)
            token = res.body.token;
        })

test("POST BASE_URL CREATE => BASE_URL should, return res.statusCode(201), res.body.firstName===user.firstName ",async()=>{
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

    token2 = res.body.token;  
 
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(user.email)
})

test("POST  Login =>(error) BASE_URL/login, should, returns res.statusCode(401), res.body.email===user.email",async()=>{
    const hits={
      email: "andres@google.com",
    password: "andres1234",
    }
  const res= await request(App)
   .post(`${BASE_URL}/login`)
   .send(hits)

   
 
    expect(res.statusCode).toBe(401)
})

test("GET GetAll => BASE_URL , should return res.statusCode(200), res.body.length === 1, res.body.firstName === user.///////firstName",async()=>{

    const res = await request(App)
    .get(BASE_URL)    
    .set('authorization',`Bearer ${token2}`)
 
    id=res.body[0].id
    

   
    expect(res.statusCode).toBe(200)
    expect(res.body[0].firstName).toBe(user.firstName)
    expect(res.body[0].phone).toBe(user.phone)
    expect(res.body).toHaveLength(1)
    expect(res.body).toBeDefined()
})

test("PUT BASE_URL/:id, should return res.statusCode(200)",async()=>{
    const UpdateUser={
        firstName: "andres rincon arzuza",
        lastName: "rincon",
         email: "andres1234@google.com",
    }
    const res = await request(App)
    .put(`${BASE_URL}/${id}`)
    .send(UpdateUser)
    .set('authorization',`Bearer ${token2}`)
    
     expect(res.statusCode).toBe(200)
     expect(res.body.firstName).toBe(UpdateUser.firstName)
     expect(res.body).toBeDefined()

})

test("DELETE => BASE_URL/:id, should return res.statusCode(200)",async()=>{
    const res = await request(App)
    .delete(`${BASE_URL}/${id}`)
    .set('authorization',`Bearer ${token2}`)

    expect(res.statusCode).toBe(204)

})