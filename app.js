var express = require('express'),
    path = require('path'),
    nunjucks = require('nunjucks'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport'),
    async = require('async'),
    dotenv = require('dotenv').config();

// Integrating socket.io
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// View engine setup
var nunEnv = nunjucks.configure(path.join(__dirname, 'app/views/'), {
    autoescape: true,
    cache: false,
    watch: true,
    express: app
});
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

// Enabling cookieParser
app.use(cookieParser());

// Create a session middleware
app.use(session({
    secret: 'my_secret_key',
    resave: true,
    saveUninitialized: true
}));

// Flash messages are stored in the session
app.use(flash());

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

// Load controllers
require('./app/boot')(app, { nunEnv: nunEnv, io: io, verbose: !module.parent });

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.title = err.status || "500 Internal Server Error";
    res.locals.message = err.message;
    res.locals.error = process.env.APP_ENV === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error/500');
});

module.exports = {app: app, server: server};
