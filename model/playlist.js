var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var playlistSchema = new Schema(
	{
		name : {
			type : String,
			trim : true
		},
		medias : [ {type : Mongoose.Schema.ObjectId, ref : 'media'} ],
		start : {
			type : String,
			trim : true
		},
		end : {
			type : String,
			trim : true
		},
		isDelete : {
			type : Number,
			trim : true
		}
	}
);
module.exports = Mongoose.model('playlist', playlistSchema);
