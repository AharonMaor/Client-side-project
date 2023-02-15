// Maor Aharon 208253625
// Or Jerbi 318851177
// Dayana Pergement 315522201
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var apiRouter = require('./routes/api');
var aboutRouter = require('./routes/about');
var reportRouter = require('./routes/report');
var addcostRouter = require('./routes/addcost');


var app = express();
mongoose.connect('mongodb+srv://maor:101010@cluster0.vowbs48.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/api', apiRouter);
app.use('/about', aboutRouter);
app.use('/report', reportRouter);
app.use('/addcost', addcostRouter);


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