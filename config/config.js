//invoke strict mode
'use strict';

//This file switches the config based ont the process.env.NODE_ENV (defaults set in server.js)
module.exports = require('./env/' + process.env.NODE_ENV);
