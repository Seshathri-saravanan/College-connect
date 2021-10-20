const express = require("express");

const userRouter = express.Router();
userRouter.get("/home",(req,res,next)=>{console.log("this is home");res.send("hello");next();});
//userRouter.get("/user",(re))

module.exports = userRouter