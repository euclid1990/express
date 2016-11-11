var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Integrating socket.io
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// View engine setup
app.set('view engine', 'pug');

// Create a session middleware
app.use(session({
    secret: 'my_secret_key',
    resave: true,
    saveUninitialized: true
}));

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Load controllers
require('./app/boot')(app, { io: io, verbose: !module.parent });

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render(path.join(__dirname, 'app/views/error/500'));
});

module.exports = {app: app, server: server};
