'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let choiceControl = require('./choice-control');

let app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  const allowedOrigins = [
    'workersandbox.mturkcontent.com',
    'www.mturkcontent.com'
  ];
  const allowedMethods = ['GET', 'POST'];

  res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
  res.header('Access-Control-Allow-Methods', allowedMethods.join(','));

  next();
});

app.use('/', choiceControl);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
