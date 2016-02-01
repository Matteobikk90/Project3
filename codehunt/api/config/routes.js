var express  = require('express');
var router   = express.Router();
var passport = require("passport");

var usersController = require('../controllers/usersController');

router.post('/signin', usersController.signin);
router.post('/signup', usersController.signup);

module.exports = router;
