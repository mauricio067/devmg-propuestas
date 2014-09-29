(function() {
    var modules = [
        'ngRoute',
        'SitdCtrl'
    ];
    var app = angular.module('sitd', modules);
    app.config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/view/:textId', {
                templateUrl: 'templates/public-content.html',
                controller: 'SitdPublicController'
            });
        }]);
    app.factory('Page', function() {
        var title = '';
        return {
            title: function() {
                return title;
            },
            setTitle: function(newTitle) {
                title = newTitle
            }
        };
    });
    app.controller("MainCtrl",["$scope","Page",function($scope,Page){
             $scope.Page = Page;
    }])
    // app.config(['marked', function(marked) { marked.setOptions({gfm: true}); }]); 
})();
