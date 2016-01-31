var express  = require('express');
var router   = express.Router();
var passport = require("passport");

//require controllers

var usersController = require('../controllers/usersController');
// var postsController = require('../controllers/postsController');

//routes 

router.post('/signin', usersController.signin); //add controllers);
router.post('/signup', usersController.signup); //add controllers);

router.route('/users')
  .get(usersController.usersIndex)

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)  

/* router.route('/posts')
  .get(postsController.postsIndex)  

  router.route('/posts/:id')
  .get(postsController.postsShow)
  .put(postsController.postsUpdate)
  .patch(postsController.postsUpdate)
  .delete(postsController.postsDelete) */

module.exports = router;
