/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    nunjucks = require('nunjucks'),
    helper = require('./libraries/helper'),
    inspector = require('./libraries/inspector'),
    mysql = require('./libraries/mysql');

module.exports = function(parent, options) {


    mysql.connect(function() {

        // Define option parameters
        var nunEnv = options.nunEnv,
            io = options.io,
            verbose = options.verbose;

        // Define nunjucks global variables/functions
        nunEnv.addGlobal('old', helper.old);

        // Register route of all controllers
        require('./autoload')(parent, verbose);

        // Listen on the connection event for incoming sockets
        io.on('connection', function(socket){
            console.log('A user connected');
            socket.on('disconnect', function(){
                console.log('A user disconnected');
            });
        });

    });
};