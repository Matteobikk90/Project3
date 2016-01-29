var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var postSchema = new mongoose.Schema({ 
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'updated_at' 
    }
   //reference 'users'
});

//passport 

module.exports = mongoose.model("Post", postSchema);