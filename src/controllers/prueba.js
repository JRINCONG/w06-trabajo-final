const array=[
    
      {
        id: 1,
        firstName: 'Jairo',
        lastName: 'Rincon',
        email: 'rincon@google.com',
        password: '$2b$10$NinqRtt4pY2VEXtO6LczdO0EQ4z754wLCnSNf08YYjJz4PxCKA6pS',
        phone: 123654789,
        createdAt: "2024-08-20T13:27:52.871Z",
        updatedAt: "2024-08-20T14:39:23.605Z"
      },
      {
        id: 1,
        firstName: 'Jairo',
        lastName: 'Rincon',
        email: 'rincon@google.com',
        password: '$2b$10$NinqRtt4pY2VEXtO6LczdO0EQ4z754wLCnSNf08YYjJz4PxCKA6pS',
        phone: 123654789,
        createdAt: "2024-08-20T13:27:52.871Z",
        updatedAt: "2024-08-20T14:39:23.605Z"
      }
    ]
array.forEach((x)=>{
    delete x.email
    delete x.password
})

console.log(array)