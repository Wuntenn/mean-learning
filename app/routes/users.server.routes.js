//This var users will get all methods from the controller.
//We then call each of those methods for specific route below.
var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/', 
            failureRedirect: '/signin', 
            failureFlash: true 
        }));

    app.get('/oauth/facebook', passport.authenticate('facebook', {
        scope: 'email',
        failureRedirect: '/signin' 
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    app.get('/signout', users.signout);
};
