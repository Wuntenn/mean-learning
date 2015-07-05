'use strict';
angular.module('articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
    function($scope, $routeParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;
    }
]);

$scope.create = function() {
    var article = new Articles({
        title: this.title,
        content: this.content
    });

    article.$save(function(response) {
        $location.path('articles/' + response._id);
    }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
    });
};

$scope.find = function() {
    $scope.articles = Articles.query();
};

$scope.findOne = function() {
    $scope.article = Articles.get({
        articleId: $routeParams.articleId 
    });
};

$scope.update = function() {
    $scope.article.$update(function() {
        $location.path('articles/', + $scope.article._id);
    }, function(errorResponse) {
        $scope.error = errorResponse.data.message; 
    });
};
$scope.delete = function(article) {
    if (article) {
        //Here you are on the list view so you had to specify which article you wanted to delete
        //by calling the $scope.delete() with an article.
        //the $remove takes care of business however we must manually delete the article from the
        //list.
        article.$remove(function() {
            for (var i in $scope.articles) {
                if ($scope.articles[i] === article) {
                    $scope.articles.splice(i, 1);
                }
            }
        });
    } else {
        //Here we are in the read view hence we don't call this method with the article as a parameter.
        //In this case it just deletes the article in the $scope object.
        $scope.article.$remove(function() {
            $location.path('articles');
        });
    }
};
