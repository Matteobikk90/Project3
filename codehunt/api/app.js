var express        = require('express');
var ejsLayouts  = require('express-ejs-layouts')
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var app            = express();

var config = require('./config/config');
var User = require('./models/user');
var Post = require('./models/post');
var secret = require('./config/config').secret;

//mongoose database setup
mongoose.connect(config.database);

//require passport
require('./config/passport')(passport);

//set view engine and define view directory 
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.set('views', './views')

//method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

/*var routes = require('./config/routes');
app.use("/", routes); */


app.all("/" ,  expressJWT( { secret: secret })
  .unless({
    path: [
      { url: '/signin', methods: ['POST'] },
      { url: '/signup', methods: ['POST'] },
      { url: '/', methods: ['GET'] },
      { url: '/profile/:userid', methods: ['GET'] },
      { url: '/category/:category', methods: ['GET'] },
      { url: '/language/:language', methods: ['GET'] }
    ]
  }));

// get current user
app.use(function(req, res, next){
  console.log(req.user);
  global.currentUser = req.user;
  next();
});

//routes
 var routes = require('./config/routes');
  app.use("/", routes); 



app.listen(3000);