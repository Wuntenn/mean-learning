'use strict';
//Development configuration options 
//console.log('Using development config');
module.exports  = {
    db: 'mongodb://localhost/mean-book',
    sessionSecret: 'MySecret',
    facebook: {
        clientID: '600248263427599',
        clientSecret: 'cad86f712e0ff111b5463024f13e85b4',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    twitter: {
        clientID: 'eHo1yAKcQVLFzD2wqcMj9zRR0',
        clientSecret: 'hcW3VdDkz6tzdtEpFfJx6YUL6NCw9hwJ5F03wESpICYSpODI2q',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    }
};
