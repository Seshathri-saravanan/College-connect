const express = require("express")
const userRouter = require("./routes/userRouter")
const User = require("./models/User")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const {MongoClient}= require("mongodb");
const Mongoose = require("mongoose");
const port =8080

const uri="mongodb+srv://seshathri:seshathri@cluster0.ei2f0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connect  = Mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true},()=>{
	console.log("connected to db")
	//User.create({username:"username",password:"password"},(user)=>{console.log("user",user)});
});


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser("oiihdefkjbefioyhef"));
//app.use(bodyParser.json());
app.use(userRouter);


app.listen(port,()=>{console.log("listening in port",port)});