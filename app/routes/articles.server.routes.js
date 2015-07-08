'use strict';
var users = require('../controllers/users.server.controller'),
    articles = require('../controllers/articles.server.controller');

module.exports = function(app) {
    app.route('/api/articles')
        .get(articles.list)
        .post(users.requiresLogin, articles.create);

    app.route('/api/articles/:articleId')
        .get(articles.read)
        .put(users.requiresLogin, articles.hasAuthorisation, articles.update)
        .delete(users.requiresLogin, articles.hasAuthorisation, articles.delete);

    app.param('articleId', articles.articleByID);
};
