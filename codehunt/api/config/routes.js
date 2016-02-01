var express  = require('express');
var router   = express.Router();
var passport = require("passport");

//require controllers
var usersController = require('../controllers/usersController');
var postsController = require('../controllers/postsController');

//authentication routes
router.post('/signin', usersController.signin);
router.post('/signup', usersController.signup);

//user and post routes
router.route('/')
	.get(postsController.postsIndex)

router.route('/:userid')
	.get(usersController.usersShow)
	.patch(usersController.usersUpdate)
	.delete(usersController.usersDelete)
	.post(postsController.addPost);

router.route('/:userid/:postid')
	.get(postsController.showPost)
	.patch(postsController.updatePost)
	.delete(postsController.deletePost);

module.exports = router;
