/* jshint node: true */
"use strict";

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            //notice done's params: error, user-object, options
            if (err) {
                return done(err);
            } 

            //No user well no error here (null), send options: message 
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            //send back null (no error), false (no user) , message
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user);
        });
    }));
};
