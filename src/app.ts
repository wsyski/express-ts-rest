import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import router from './routes';
import cookieParser = require('cookie-parser');

const app: express.Express = express();

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/content', express.static(__dirname + '/assets'));

app.use('/api/v1', router); // prefix all the api calls with '/api'

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req, res, next) => {
    res.status(err['status'] || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// force HTTPS
// if (app.get('env') === 'production') {
//  app.use(function(req, res, next) {
//    var protocol = req.get('x-forwarded-proto');
//    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
//  });
// }

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
  return null;
});

export default app;
