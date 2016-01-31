var express  = require('express');
var router   = express.Router();
var passport = require("passport");

//require controllers

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');

//routes 
router.post('/signin', authenticationsController.signin); //add controllers);
router.post('/signup', authenticationsController.signup); //add controllers);

module.exports = routercontrollers,
