const mongoose = require("mongoose")
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');

var Account = new Schema({
	_id:{
		type:String,
		default:uuidv4
	},
	username:{
		type:String,
		unique:true,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	dob:{
		type:String,
		required:false
	},
	usertype:{
		type:String,
		required:false
	},
	rollno:{
		type:String,
		required:false
	},
	admissionyear:{
		type:String,
		required:false
	},
	branch:{
		type:String,
		required:false
	},
	profileurl:{
		type:String,
		required:false
	},
	email:{
		type:String,
		required:false
	},
	description:{
		type:String,
		required:false
	}
});

module.exports = mongoose.model("Account",Account);