var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var mediaSchema = new Schema(
	{
		name : {
			type : String,
			trim : true
		},
		type : {
			type : String,
			trim : true
		},
		isDelete : {
			type : Number,
			trim : true
		}
	}
);
module.exports = Mongoose.model('media', mediaSchema);
