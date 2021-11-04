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
    const posts = await Post.find({});
    const groups = await Group.find({});
    var userposts = getPostsByUsername(posts,groups,username);
    res.json({posts:userposts});
    next();
})

router.get("/post",(req,res,next)=>{
    const username =  req.signedCookies.user;
    const postID = req.body.post && req.body.post.postID;
    Post.findById(postID)
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
    Post.create(req.body && req.body.post).then((post)=>{
        res.json({post});
    })
    .catch(err=>{
        console.log(err);
        res.statusCode(400).json({err});
    });
})



module.exports = router;