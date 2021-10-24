const mongoose = require("mongoose")
const {Schema} = mongoose

var Group = new Schema({
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