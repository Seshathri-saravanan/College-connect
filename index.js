const express = require("express")
const userRouter = require("./routes/userRouter")
const accountRouter = require("./routes/accountRouter");
const groupRouter = require("./routes/groupRouter")
const postRouter = require("./routes/postRouter")
const User = require("./models/User")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const {MongoClient}= require("mongodb");
const Mongoose = require("mongoose");
const cors = require("cors");
const port =8080

const uri="mongodb+srv://seshathri:seshathri@cluster0.ei2f0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connect  = Mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true},()=>{
	console.log("connected to db")
	//User.create({username:"username",password:"password"},(user)=>{console.log("user",user)});
});


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(cors());
app.use(cookieParser("sfihf"));
function addHeaders(req,res,next){
  res.setHeader('Access-Control-Allow-Origin',req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, HEAD, PUT, PTIONS, POST');
  res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader("Access-Control-Max-Age", "1800");
  console.log(req.body)
  if(req.method=="OPTIONS"){
    res.status(200).end();
    console.log("204 res",req.body);
  }
  else next();
}
app.use(addHeaders)
app.use(userRouter);
function auth(req,res,next){
  console.log("auth",req.signedcookies)
  //console.log("signedcookies",req.signedCookies.user,req.headers.cookie)
  if(req.signedCookies && req.signedCookies.user){
    var username = req.signedCookies.user;
    User.findOne({username:username}).then(user=>next()).catch(err=>res.status(400).send(err));
  }
  else{
    res.status(400).send({
       message: 'Unauthorized'
    });
    //res.end();
  }
}
app.get("/isauth",(req,res,next)=>{
  if(req.signedCookies && req.signedCookies.user){
    var username = req.signedCookies.user;
    console.log("username",username)
    User.findOne({username:username}).then(user=>res.json({ID:user.username})).catch(err=>res.json({ID:false}));
  }
  else res.json({ID:false});
})
app.use(auth);
app.use(accountRouter);
app.use(groupRouter);
app.use(postRouter);

app.listen(process.env.PORT || port,()=>{console.log("listening in port",port)});