const {Router} = require("express");
const Account = require("../models/Account.js");
const bodyParser = require("body-parser");

var router = Router();

router.get("/user",(req,res,next)=>{
	const username =  req.signedCookies.user;
    Account.findOne({username:username})
	.then((user) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.json({user});
	}, (err) => next(err)) 
	.catch((err) => {
		res.json({err,user:false})
	});
})

router.put("/user",(req,res,next)=>{
	var user = req.body.user;
	if(!user){
		res.json({user:false});
		return;
	}
	Account.findOneAndUpdate({username:user.username},user,{new:true},(err,user,ngrp)=>{
		if(err)res.json({err,user:false});
		else res.json({user:true})
	})
})

module.exports = router;