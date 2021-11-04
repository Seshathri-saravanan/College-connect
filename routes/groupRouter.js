const {Router} = require("express");
const Group = require("../models/Group.js");
const bodyParser = require("body-parser");
const {getGroupsByUsername} = require("../helperFunctions");
var router = Router();

router.get("/groups",async (req,res,next)=>{
	const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var groups = await Group.find({});
    var groupsByUsername = getGroupsByUsername(groups,username);
    res.statusCode=200;
    res.json({groups:groupsByUsername});
    next();
})

router.get("/group",async (req,res,next)=>{
	const username =  req.signedCookies.user;
    const groupID = req.body.groupId;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    Group.findById(groupID)
	  .then((group) => {
	        res.statusCode = 200;
	        res.json({group});
	      }, (err) => next(err))
	  .catch((err) => next(err));
    next();
})

router.post("/group",async (req,res,next)=>{
    const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    Group.create(req.body).then((group)=>{
        res.json({group});
    })
    .catch(err=>{
        console.log(err);
        res.statusCode(400).json({err});
    });
})


router.put("/group",async (req,res,next)=>{
    const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var newgroup = req.body.group;
    console.log("newgroup",newgroup)
    Group.findOneAndUpdate({_id:newgroup._id},newgroup,(err,group,ngrp)=>{
        console.log("group",group)
        if(err)res.json({err,group:false});
        else res.json({group:true})
    })
})

module.exports = router;