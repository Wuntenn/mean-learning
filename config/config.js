//This file switches the config based ont the process.env.NODE_ENV
module.export = require('./env/'+ process.env.NODE_ENV );
