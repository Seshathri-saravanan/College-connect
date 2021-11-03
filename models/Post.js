const mongoose = require("mongoose")
const {Schema} = mongoose

var Post = new Schema({
	ownerID:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	type:{
		type:String,
		required:true
	},
	file_links:{
		type:Array,
		required:true
	},
	expiryTime:{
		type:String,
		required:false
	},
	pollData:{
		type:String,
		required:false
	},
	pollStatus:{
		type:String,
		required:false
	},
	groups:{
		type:Array,
		required:true
	}
});

module.exports = mongoose.model("Post",Post);