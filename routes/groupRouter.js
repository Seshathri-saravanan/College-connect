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
    const groupID = req.body.groupId;
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
    Group.create({...req.body}).then((group)=>{
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

router.put("/adduserstogroup",async (req,res,next)=>{
    const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var obj = req.body.adduserstogroup;
    var groupID = obj.groupID;
    var users = obj.userLists;
    console.log("obj",obj)
    var group = await Group.findOne({_id:groupID});
    console.log("group found",group)
    /*
    if(group){
        Group.findOneAndUpdate({_id:groupID},{...group,visibleTo:users},(err,group,ngrp)=>{
            //console.log("group",group)
            if(err)res.json({err,adduserstogroup:false});
            else res.json({adduserstogroup:true})
        })
    }
    else res.json({adduserstogroup:false,message:"group not found"});
    */
    
})

module.exports = router;