var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    //any file which uses this will require the model
    require('../app/models/user.server.model'); 
    return db;
};
