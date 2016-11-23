var Main = require('../models/Main'),
    model = new Main(),
    helper = require('../libraries/helper'),
    async = require('async');

exports.index = function(req, res, next) {
    var total = 0;
    async.series([
        model.all.bind(model),
        model.count.bind(model),
        model.get.bind(model, [2])
    ], function(err, results) {
        if (err) return next(err);
        var [users, total, user] = [results[0], results[1][0].total, results[2]];
        console.log(`MainController|Result: ${total}`);
        res.render('index', { title: 'Express', total: total, user: user, info: req.flash('info') });
    });
};

exports.create = function(req, res) {
    req.flash('info', 'Flash is back!')
    res.render('create');
};