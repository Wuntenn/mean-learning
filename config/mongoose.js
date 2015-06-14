'use strict';
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    //add the schema to the db (different from book)
    require('../app/models/user.server.model'); 

    return db;
};
