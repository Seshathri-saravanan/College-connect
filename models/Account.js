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
		unique:false,
		required:true,

	},
	name:{
		type:String,
		default:"",
		required:true
	},
	dob:{
		type:String,
		default:"",
		required:false
	},
	type:{
		type:String,
		default:"Student",
		required:false
	},
	rollNo:{
		type:String,
		default:"",
		required:false
	},
	admissionYear:{
		type:String,
		default:"",
		required:false
	},
	branch:{
		type:String,
		default:"",
		required:false
	},
	profileUrl:{
		type:String,
		default:"",
		required:false
	},
	email:{
		type:String,
		default:"",
		required:false
	},
	description:{
		type:String,
		default:"",
		required:false
	}
});

module.exports = mongoose.model("Account",Account);