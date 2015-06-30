'use strict';
var mainApplicationModuleName = 'mean',
    mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'users', 'example', 'articles']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

(function removeFacebookAppendedHash() {
  var regex = /\/#_=_$/;
  var fbjunk = new RegExp(regex).test(window.location.hash);
  if (!window.location.hash || !fbjunk )
    return;
  if (window.history && window.history.replaceState)
    return window.history.replaceState({}, document.title, '#!');
  // Prevent scrolling by storing the page's current scroll offset
  var scroll = {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  };
  window.location.hash = "#!";
  // Restore the scroll offset, should be flicker free
  document.body.scrollTop = scroll.top;
  document.body.scrollLeft = scroll.left;
}());

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});
