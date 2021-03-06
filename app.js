var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var user = require('./routes/user');
var login = require('./routes/login');
var world = require('./routes/world');
var passport = require('passport');
var redis = require("redis"),
    client = redis.createClient();
var RedisStore = require('connect-redis')(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ store: new RedisStore({
  client: client,
  host:'127.0.0.1',
  port:6380,
  prefix:'sess'
}), secret: 'SEKR37' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/user', user);
app.use('/login', login);
app.use('/world', world);


// client.set("string key", "string val", redis.print);
//     client.hset("hash key", "hashtest 1", "some value", redis.print);
//     client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
//     client.hkeys("hash key", function (err, replies) {
//         console.log(replies.length + " replies:");
//         replies.forEach(function (reply, i) {
//             console.log("    " + i + ": " + reply);
//         });
//         client.quit();
//     });

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
