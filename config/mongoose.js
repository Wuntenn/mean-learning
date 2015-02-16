var config = require('./env/' + process.env.NODE_ENV),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    return db;
};
