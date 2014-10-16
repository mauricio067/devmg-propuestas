(function () {
	var modules = [
	'ngRoute',
	'SitdCtrl'
	];
	var app = angular.module('sitd', modules);
	app.config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/my-sitds', {
			templateUrl: '../templates/list.html',
			controller: 'SitdController'
		});
		$routeProvider.when('/', {
			templateUrl: '../templates/add.html',
			controller: 'SitdController'
		});
		$routeProvider.when('/add', {
			templateUrl: '../templates/add.html',
			controller: 'SitdController'
		});
		$routeProvider.when('/edit/:textId', {
			templateUrl: '../templates/add.html',
			controller: 'SitdEditController'
		});
		$routeProvider.when('/view/:textId', {
			templateUrl: '../templates/view.html',
			controller: 'SitdViewController'
		});
	}]);
	// app.config(['marked', function(marked) { marked.setOptions({gfm: true}); }]); 
})();
