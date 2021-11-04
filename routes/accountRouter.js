const {Router} = require("express");
const Account = require("../models/Account.js");
const bodyParser = require("body-parser");

var router = Router();

router.get("/user",(req,res,next)=>{
	const username =  req.signedCookies.user;
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    Account.findOne({username:username})
	  .then((user) => {
	        res.statusCode = 200;
	        res.json({user});
	      }, (err) => next(err))
	  .catch((err) => next(err));
    next();
})


module.exports = router;