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
		required:true
	},
	owners:{
		type:Array,
		required:true
	},
	visibleTo:{
		type:Array,
		required:true
	},
	profileUrl:{
		type:Array,
		required:true
	}
});

module.exports = mongoose.model("Group",Group);