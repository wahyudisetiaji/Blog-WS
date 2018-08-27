var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose')
require('dotenv').config();

const DB_MLAB = {
  development: process.env.DB_DEVELOPMENT,
  test: process.env.DB_TESTING
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(!process.env.NODE_ENV){
  process.env.NODE_ENV = 'development'
}

console.log('======>', process.env.NODE_ENV);
var db = mongoose.connection
mongoose.connect(DB_MLAB[process.env.NODE_ENV], { useNewUrlParser: true })
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected mlab!');
});

app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
