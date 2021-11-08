const {Router} = require("express");
const User = require("../models/User.js");
const Account = require("../models/Account.js");
const bodyParser = require("body-parser");

var router = Router();

router.get("/",(req,res,next)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({home:"home"});
})

router.post('/signup', (req, res, next) => {
   //console.log("in signup route",req);
   User.find({username:req.body.username}).then((users)=>{
      if(users.length!=0){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({message:"user already exists"});
        return;
      }
   })
   User.create(req.body).then((user) => {
      Account.create({username:user.username,name:user.username}).then((account)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({account:{username:user.username}});
      }).catch((err)=>console.log(err));
      
     
   }).catch((err)=>console.log(err));
 });
 
 router.post('/login', (req, res,next) => {
   console.log("login req",req.body)
  User.findOne({username:req.body.username})
  .then((user) => {
      console.log('user found ', user);
      if(!user){
        return res.json({account:null,msg:"User not found!"});
      }
      else if(user.password!=req.body.password){
        return res.json({account:null,msg:"Incorrect password"});
      }
      else{
        res.statusCode = 200;
        res.cookie('user',user.username,{signed:true,maxAge:900000000,sameSite:"none",secure:true})
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.json({user});
       // console.log("setting credn headers",res.getHeaders())
        
      }
      
  }, (err) => next(err))
  .catch((err) => next(err));
   
 });

 router.get('/logout',(req,res)=>{
   console.log("logging out");
   res.clearCookie('user');
   res.json({logout: true, status: 'You are successfully logged out!'});
 })

 module.exports= router;