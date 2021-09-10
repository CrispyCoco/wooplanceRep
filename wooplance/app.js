const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database/models')
const session = require('express-session');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gigRouter = require('./routes/gigs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SESSION
app.use(session({
  secret: "wooplance page",
  resave: false,
  saveUninitialized: true
}));

//COOKIES
app.use(function(req, res, next) {
  if(req.cookies.userId && !req.session.user) {
    db.User.findByPk(req.cookies.userId).then(results => {
      req.session.user = results;
      return next();
    });
  } else {
  	return next();
  }}
);

//LOCALS
app.use(function(req, res, next) {
  if(req.session.user){
    res.locals = {
      log: true,
      myUser: req.session.user,
    }
  } else {
    res.locals = {
      log: false
    }
  }

	return next();
});

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/gig', gigRouter);
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
