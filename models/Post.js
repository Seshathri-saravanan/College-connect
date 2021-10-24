const mongoose = require("mongoose")
const {Schema} = mongoose

var Post = new Schema({
	createdBy:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	filelinks:{
		type:Array,
		required:true
	},
	groups:{
		type:Array,
		required:true
	}
});

module.exports = mongoose.model("Post",Post);