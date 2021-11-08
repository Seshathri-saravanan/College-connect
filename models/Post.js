const mongoose = require("mongoose")
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');

var Post = new Schema({
	_id:{
		type:String,
		default:uuidv4
	},
	owner:{
		type:[{ type: String, ref: 'Account' ,sparse:true}],
		sparse:true,
		default:[],
		required:true
	},
	description:{
		type:String,
		default:"",
		required:true
	},
	type:{
		type:String,
		default:"",
		required:true
	},
	file_links:{
		type:Array,
		default:[],
		required:true
	},
	expiryTime:{
		type:String,
		default:"",
		required:false
	},
	pollData:{
		type:String,
		default:"",
		required:false
	},
	pollStatus:{
		type:String,
		default:"",
		required:false
	},
	groups:{
		type:[{ type: String, ref: 'Group' ,sparse:true}],
		sparse:true,
		default:[],
		required:true
	}
});

module.exports = mongoose.model("Post",Post);