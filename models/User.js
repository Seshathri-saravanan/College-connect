const mongoose = require("mongoose")
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');

var User = new Schema({
	_id:{
		type:String,
		default:uuidv4
	},
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
});

module.exports = mongoose.model("User",User);