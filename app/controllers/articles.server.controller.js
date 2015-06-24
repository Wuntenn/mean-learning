'use strict';
var mongoose = require('mongoose'),
    Article = mongoose.model('Article');

var getErrorMessage = function(err) {
    if (err.errors){
        for (var errName in err.errors){
            if (err.errors[errName].message) return  err.errors[errName].message
        }
    } else {
        return 'Unknown server error';
    }
};

export.create = function(req, res) {
    var article = new Article(req.body);
    article.creator = req.user;

    article.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

export.list = function(req, res) {
    Article.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, articles) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {

        }
    });
};
