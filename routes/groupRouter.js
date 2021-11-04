const {Router} = require("express");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
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
    const groupID = req.body.group && req.body.group.groupId;
    Group.findById(groupID)
	  .then((group) => {
	        res.statusCode = 200;
	        res.json({group});
	      },(err)=>res.json({err}))
	  .catch((err)=>res.json({err}));
    
})

router.post("/group",async (req,res,next)=>{
    const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const group = req.body.group 
    Group.create({...group})
    .then((group)=>{
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
    Group.findOneAndUpdate({_id:newgroup._id},newgroup,{new:true},(err,group,ngrp)=>{
        console.log("group",group)
        if(err)res.json({err,group:false});
        else res.json({group:true})
    })
})

router.put("/updateusersingroup",async (req,res,next)=>{
    const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var obj = req.body.updateusersingroup;
    if(!obj){
        res.json({updateusersingroup:false});
        return
    }
    var groupID = obj && obj.groupID;
    var users = obj && obj.usersList;
    var group = await Group.findOne({_id:groupID});
    console.log("group found",group,users)
    if(group){
        Group.findOneAndUpdate({_id:groupID},{visibleTo:users},{new:true},(err,group,ngrp)=>{
            console.log("group",group,err,ngrp)
            if(err)res.json({err,updateusersingroup:false});
            else res.json({updateusersingroup:true})
        })
    }
    else res.json({updateusersingroup:false,message:"group not found"});
    
})

module.exports = router;