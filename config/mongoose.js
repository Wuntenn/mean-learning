var config = require('./config');
var mongoose = require('mongoose');

console.log(require('./config'));
module.exports = function() {
    var db = mongoose.connect(config.db);
    return db;
};
