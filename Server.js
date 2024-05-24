const express= require('express')
const mysql = require('mysql');



const app= express();
const port= 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static('public/'))

app.post('/contactUs', (req, res)=>{
    const data=req.body

    const insertcontact=`INSERT INTO contacts (firstName, lastName, email, phone, subject, message)
        VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.phoneNumber}', '${data.subject}', '${data.Message}')`

    con.query(insertcontact, function(err,result){
        if (err) console.log(err);
        console.log(result)
        
    })
    
})

app.get('/loginUser', (req, res)=>{
    const data = req.body;
    

    const check = `SELECT * FROM users WHERE email='${data.email}'AND password='${data.password}' AND phone='${data.phone}'`

    con.query(check, function(err,result){
        res.json("loggedIn Successfully")
        
    })
})

app.post('/order',(req, res)=>{
    const data=req.body
    console.log(req.body);
    console.log(data.address)
    console.log(data.city)

    const insertcontact=`INSERT INTO orders (firstName, lastName, email, phone,  Address, city, state, pinCode, accountNumber)
        VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.phone}', '${data.address}', '${data.city}', '${data.state}', '${data.pinCode}', '${data.cardNumber}')`


    con.query(insertcontact, function(err,result){
        if (err) console.log(err);
        
        res.redirect("http://localhost:5500/public/HTML/cartwish.html")  
    })
})




app.post('/registerUser', async(req, res)=>{
  
    const data =await req.body;

    const insertNewUser=`INSERT INTO users (fullName, phone, email,  password) VALUES ('${data.fullName}', '${data.phone}', '${data.email}', '${data.password}')`

    con.query(insertNewUser, function(err,result){
        if (err) {
            // console.log("user already exists!!!") 
            res.send({'message': "User already exists!!"})
        }     
    })
})


app.listen(port, ()=>console.log(`Server has started on port: ${port}`))

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aakash7679@",
    database: "Madhav"
})





const userSchema=`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY, fullName VARCHAR(225) NOT NULL, 
    email VARCHAR(225) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    password VARCHAR(225) NOT NULL,
    CONSTRAINT UC_users UNIQUE (email, phone)
    )`


const contactSchema=`CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(225) NOT NULL, 
    lastName VARCHAR(225) NOT NULL,
    email VARCHAR(225) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    subject VARCHAR(500) ,
    message VARCHAR(1200) NOT NULL
    )`


const displayData=`SELECT * FROM users`


const orderSchema=`CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    firstName VARCHAR(225) NOT NULL, 
    lastName VARCHAR(225) NOT NULL,
    email VARCHAR(225) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pinCode VARCHAR(10) NOT NULL,
    accountNumber VARCHAR(20) NOT NULL
    )`




con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query(userSchema, function(err,result){
        if (err) throw err;
        console.log("User Table Created")
    })
    con.query(contactSchema, function(err,result){
        if (err) throw err;
        console.log("Contact Table Created")
    })
    con.query(orderSchema, function(err,result){
        if (err) throw err;
        console.log("Order Table Created")
    })
    
    con.query(displayData, function(err,result){
        if (err) throw err;
        const data= result
    })


  });
  