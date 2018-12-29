const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex = require('knex')

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db= knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app=express();

//Middleware to parse req.body
app.use(bodyParser.json())
app.use(cors())

//Signin
app.get('/',(req, res)=>{res.send("It is working")});

//Signin
app.post('/signin',signin.handleSignIn(db,bcrypt));

//Register
app.post('/register',(req, res)=>{register.handleRegister(req,res,db,bcrypt)});

//ID
app.get('/profile/:id',(req, res)=>{profile.handleProfileGet(req,res,db)});

//image
app.put('/image',(req, res)=>{image.handleImage(req,res,db)});
app.post('/imageurl',(req, res)=>{image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3001,()=>{
    console.log(`App is running on port ${process.env.PORT}`)
});