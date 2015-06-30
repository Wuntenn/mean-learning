'use strict';
angular.module('articles').factory('Articles', ['$resource', function(){
    return $resoure('api/articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);
