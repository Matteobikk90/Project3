var passport = require("passport");
var secret   = require('../config/config').secret 
var jwt      = require('jsonwebtoken');
var Post = require('../models/post');
var User = require('../models/user');

function signup(req, res, next) {
  var localStrategy = passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).json({ message: 'Something went wrong!' });
    if (info) return res.status(401).json({ message: info.message });
    if (!user) return res.status(401).json({ message: 'User already exists!' });

    // User has authenticated so issue token 

    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    // Send back the token to the front-end to store
    
    return res.status(200).json({ 
      success: true,
      message: "Thank you for authenticating",
      token: token,
      user: user
    });
  });

  return localStrategy(req, res, next);
};


function signin(req, res, next) {
  User.findOne({
    "local.email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(403).json({ message: 'No user found.' });
    if (!user.validPassword(req.body.password)) return res.status(403).json({ message: 'Authentication failed.' });

    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      success: true,
      message: 'Welcome!',
      token: token,
      user: user
    });
  });
};


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
  usersDelete: usersDelete,
  signin: signin,
  signup: signup
}
