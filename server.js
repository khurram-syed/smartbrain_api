const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt')
const register =require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profiles =require('./controllers/profiles')
const user = require('./controllers/user')

var app = express()
var db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'admin',
      password : 'admin',
      database : 'smart-brain'
    }
  });
  //console.log( db.select('*').from('users'));  
app.use (bodyParser.json());
app.use(cors());

/* 
  1- /users - GET
  2- /signin - POST - success
  3- /signup - POST - user
  4- /profile/:userid - GET - user
  5- /image  ---> PUT 
*/
 
//1- Users Profile
app.get('/users',(req,res)=>{profiles.handleProfiles(req,res,db)})

//2- Signin
app.post('/signin',(req,res)=>{signin.handleSignin(db,bcrypt)(req,res)});

//3- Signup
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

//4- Profile
app.get('/profile/:id',(req,res)=>{user.getUser(req,res,db)} )

//5- Image Counting
app.put('/image', (req,res)=>{image.handleImageCount(req,res,db)})

//6- Clarifai End point - For Security Reason
app.post('/imageurl',(req,res)=>{image.handleImageApi(req,res)})
//- Check The Server
app.get('/',(req, res)=>{
    res.json("Success")
    //res.json(database.users)
})


app.listen(3000,()=>{
    console.log("App is running on port 3000..!!")
})