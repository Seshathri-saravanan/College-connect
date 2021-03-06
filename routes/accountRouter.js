const {Router} = require("express");
const Account = require("../models/Account.js");
const bodyParser = require("body-parser");

var router = Router();

router.get("/users",(req,res,next)=>{
	const username =  req.signedCookies.user;
    Account.find({})
	.then((users) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.json({users});
	}, (err) => next(err)) 
	.catch((err) => {
		res.json({err,users:false})
	});
})
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
	const username =  req.signedCookies.user;
	var user = req.body.user;
	if(!user){
		res.json({user:false});
		return;
	}
	Account.findOneAndUpdate({username:username},user,{new:true},(err,user,ngrp)=>{
		if(err)res.json({err,user:false});
		else res.json({user:user})
		console.log(err,user,ngrp)
	})
})

router.delete("/user",async (req,res,next)=>{
    const user = req.body.user;
    if(!user){
        res.json({user:false});
        return;
    }
    var dlt = await Account.deleteOne({_id:user._id})
    if(dlt && dlt.deletedCount==1){
        res.json({user:true})
    }
    else res.json({user:false});
})

module.exports = router;