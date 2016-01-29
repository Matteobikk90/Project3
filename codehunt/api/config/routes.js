var express  = require('express');
var router   = express.Router();
var passport = require("passport");

//require controllers
var usersController = require('../controllers/usersController');
var postsController = require('../controllers/postsController');

//authentication routes 
//router.post('/signin', //add controllers);
//router.post('/signup', //add controllers);

module.exports = router