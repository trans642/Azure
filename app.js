var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var TaskList = require('./routes/tasklist');
var taskList = new TaskList(process.env.CUSTOMCONNSTR_MONGOLAB_URI);

var app = express();
console.log('test from server');
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.set('view options', { layout: false });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', taskList.showTasks.bind(taskList));
//app.get('/users', taskList.showTasks.bind(taskList));
app.post('/addtask', taskList.addTask.bind(taskList));
app.post('/completetask', taskList.completeTask.bind(taskList));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
else if (env === 'production') {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(3000, function () {
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});
module.exports = app;
