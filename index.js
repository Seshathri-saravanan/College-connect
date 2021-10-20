const express = require("express")
const userRouter = require("./routes/userRouter")
const accountRouter = require("./routes/accountRouter");
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
app.use(cors());
app.use(cookieParser("sfihf"));
app.use(userRouter);
function auth(req,res,next){
  //console.log("signedcookies",req.signedCookies.user,req.headers.cookie)
  if(req.signedCookies.user){
    var username = req.signedCookies.user;
    User.findOne({username:username}).then(user=>next()).catch(err=>next(err));
  }
  else{
    next(new Error("UnAuthorized"));
  }
}
app.use(auth);
app.use(accountRouter);


app.listen(process.env.PORT || port,()=>{console.log("listening in port",port)});