require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();
var PORT = 'mongodb://heroku_lg38msfj:j1d43i2t8n9nhcmue1kh7pemkh@ds113636.mlab.com:13636/heroku_lg38msfj'

// Mongoose stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_lg38msfj:j1d43i2t8n9nhcmue1kh7pemkh@ds113636.mlab.com:13636/heroku_lg38msfj');
// mongoose.connect('mongodb://localhost/trails-app', { useMongoClient: true });

var User = require('./models/user');
var Trail = require('./models/trail');
var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var trail = require('./routes/trail');
var usertrail = require('./routes/UserTrail');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.currentUser = req.user;
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/trail', trail);
app.use('/usertrail', usertrail);

app.listen(process.env.PORT || 8080, function() {
  console.log('Express server is up and running!');
});

// catch 404 and forward to error handler - commented out
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
