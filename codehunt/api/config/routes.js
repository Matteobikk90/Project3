var express  = require('express');
var router   = express.Router();
var passport = require("passport");

//require controllers
var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');

//routes 
router.post('/signin', authenticationsController.signin); //add controllers);
router.post('/signup', authenticationsController.signup); //add controllers);

router.route('/users')
  .get(usersController.usersIndex)


router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

module.exports = router;
