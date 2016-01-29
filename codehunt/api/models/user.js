var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({ 
  local: {
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true  },
    lastName: { type: String, required: true  },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  },
  image: { type: String },
  bio: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model("User", userSchema);