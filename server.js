const express = require('express');
const apiRouter = require('./src/routes/api');

var app = express();

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

const port = process.env.PORT || '3000';
app.listen(port, () => {
	console.log(`listening on port ${port}`)
});

const SampleManager = require("./src/SamplerManager");
const manager = new SampleManager();
manager.initialize();

const TaskScheduler = require("./src/TaskScheduler");
const schedualer = new TaskScheduler(60 * 1000);
schedualer.start(manager.sampleAll.bind(manager));
