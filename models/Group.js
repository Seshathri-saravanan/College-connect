const mongoose = require("mongoose")
const ObjectId = require("mongodb").ObjectId;
const {Schema} = mongoose

var Group = new Schema({
	_id:{
		type:String,
		default:new ObjectId().toString()
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