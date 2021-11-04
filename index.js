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
  res.setHeader('Access-Control-Allow-Origin','http://localhost:3000',);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  //console.log("setting acces con c header as true",req.headers,res.headers);
  next();
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
    User.findOne({username:username}).then(res.json({ID:username})).catch(err=>res.json({ID:false}));
  }
  else res.json({ID:false});
})
app.use(auth);
app.use(accountRouter);
app.use(groupRouter);
app.use(postRouter);

app.listen(process.env.PORT || port,()=>{console.log("listening in port",port)});