var Post = require('../models/post');
var User = require('../models/user');

//get individual user and show users posts
function usersShow(req, res) {
  User.findById({_id: req.params.userid}).populate('posts').exec(function(err, user) {
    if (err) return res.status(404).json({message: "Error"});
    res.status(200).json({user: user});
  });
}

//update user
function usersUpdate(req, res) {
  User.findById({_id: req.params.userid}, function(err, user) {
    if (err) return res.status(500).json({message: "Error"});
    if (!user) return res.status(404).json({message: "User does not exist."});

    if (req.body.username) user.local.username = req.body.username;
    if (req.body.firstName) user.local.firstName = req.body.firstName;
    if (req.body.lastName) user.local.lastName = req.body.lastName;
    if (req.body.email) user.local.email = req.body.email;
    if (req.body.image) user.image = req.body.image;
    if (req.body.bio) user.bio = req.body.bio;

    user.save(function(err) {
      if (err) return res.status(500).json({message: "Error"});
      res.status(201).json({message: "User updated", user: user});
    });
  });
}

//delete user
function usersDelete(req, res) {
  User.findByIdAndRemove({_id: req.params.userid}, function(err) {
    if (err) return res.status(404).json({message: "Error - User not deleted."});
    res.status(200).json({message: 'User deleted'});
  });
}

//exports
module.exports = {
  usersShow: usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete
}