var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var timestamps = require('mongoose-timestamp');

var postSchema = new mongoose.Schema({ 
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    category: { type: String, required: true },
    language: { type: String, required: true  },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userLikes: [{type: Schema.Types.ObjectId, ref: 'User', unique: true, dropDups: true}],
	},
	{
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model("Post", postSchema);