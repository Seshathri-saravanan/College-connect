const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const {Schema} = mongoose

var Group = new Schema({
	_id:{
		type:String,
		default:uuidv4
	},
	name:{
		type:String,
		unique:true,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	owners:{
		type:[{ type: String, ref: 'Account' ,sparse:true}],
		sparse:true,
		default:[],
		required:true
	},
	visibleTo:{
		
		type:[{ type: String, ref: 'Account',sparse:true }],
		sparse:true,
		default:[],
		required:true
	},

	profileUrl:{
		type:Array,
		default:"",
		required:true
	}
});

module.exports = mongoose.model("Group",Group);