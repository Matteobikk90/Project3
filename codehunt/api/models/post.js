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

postSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

postSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model("Post", postSchema);