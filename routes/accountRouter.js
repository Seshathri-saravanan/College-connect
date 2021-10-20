const {Router} = require("express");
const User = require("../models/User.js");
const bodyParser = require("body-parser");

var router = Router();

router.get("/account",(req,res,next)=>{
	const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({account:"sample"});	
    next();
})


module.exports = router;