var Main = require('../models/Main'),
    model = new Main();

exports.index = function(req, res){
    model.all(function(err, rows, fields) {
        if (err) throw err;
        console.log('Rows: ', rows.length);
    });
    req.session.user = "faked_user";
    res.render('index', { title: 'Express' });
};

exports.create = function(req, res){
    res.render('index', { title: 'Create' });
};