const {Router} = require("express");
const Post = require("../models/Post.js");
const bodyParser = require("body-parser");
const {getPostsByUsername} = require("../helperFunctions");
const Group = require("../models/Group.js");


var router = Router();

router.get("/posts",async (req,res,next)=>{
	const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const posts = await Post.find({}).populate("owner").populate("groups");
    const groups = await Group.find({}).populate("owners").populate("visibleTo");
    var userposts = getPostsByUsername(posts,groups,username);
    res.json({posts:userposts});
    next();
})


router.get("/post",(req,res,next)=>{
    const username =  req.signedCookies.user;
    const postID = req.query && req.query.postID;
    Post.findById(postID)
    .populate("owner").populate("groups")
	  .then((post) => {
	        res.statusCode = 200;
	        res.json({post});
	      },(err)=>res.json({err}))
	  .catch((err)=>res.json({err}));
})



router.post("/post",async (req,res,next)=>{
    const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    Post.create(req.body && req.body.post)
    .then((post)=>{
        res.json({post});
    })
    .catch(err=>{
        console.log(err);
        res.statusCode(400).json({err});
    });
})


router.put("/post",async (req,res,next)=>{
    const username =  req.signedCookies.user;
    const post = req.body.post;
    if(!post){
        res.json({post:false});
        return;
    }
	Post.findOneAndUpdate({_id:post._id},post,{new:true},(err,post,ngrp)=>{
        if(err)res.json({err,post:false});
        else res.json({post:true})
    })
})

router.delete("/post",async (req,res,next)=>{
    const postID = req.query &&  req.query.postID;
    if(!postID){
        res.json({post:false});
        return;
    }
    var dlt = await Post.deleteOne({_id:postID})
    if(dlt && dlt.deletedCount==1){
        res.json({post:true})
    }
    else res.json({post:false});
})

module.exports = router;