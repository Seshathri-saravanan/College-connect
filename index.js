const express = require("express")
const userRouter = require("./routes/userRouter")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const {MongoClient}= require("mongodb");
const Mongoose = require("mongoose");
const port =8080

const app = express()
app.use(bodyParser);
app.use(userRouter);


app.listen(port,()=>{console.log("listening in port",port)});