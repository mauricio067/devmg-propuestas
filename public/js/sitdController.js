(function () {
	var moduleName = 'SitdCtrl';
	angular.module(moduleName,  ['ui.ace','TextSrvc','hljs','hc.marked']);
	var SitdController = function($scope,Text,$location){
		$scope.sitd = {};
		$scope.modes = ['Markdown','JSON', 'XML', 'Javascript','PHP','HTML'];
		$scope.sitd.type = $scope.modes[0];
		// The ui-ace option
		$scope.aceOption = {
			mode: $scope.sitd.type.toLowerCase(),
			onLoad: function (_ace) {

				// HACK to have the ace instance in the scope...
				$scope.modeChanged = function () {
					_ace.getSession().setMode("ace/mode/" + $scope.sitd.type.toLowerCase());
				};

			}
		};

		$scope.sitdList = Text.query();
		$scope.save = function(){
			Text.save({text:$scope.sitd}).$promise.then(
                                //Success
                                function(data) {
                                	$location.path('/my-sitds');

                                },

                                function(error) {
                                	console.log(error);
                                }
                                );
		};
		$scope.delete = function(id) {

			Text.remove({id: id}).$promise.then(
                                    //Success
                                    function(data) {
                                    	$scope.sitdList = Text.query();
                                    },

                                    function(error) {
                                    	console.log(error);
                                    }
                                    );


		};

	};
	var SitdEditController = function($routeParams,$scope,Text,$location){
		$scope.sitd = {};
		$scope.modes = ['Markdown','JSON', 'XML', 'Javascript','PHP','HTML'];
		$scope.sitd.type = $scope.modes[0];
		$scope.aceOption = {
			mode: $scope.sitd.type.toLowerCase(),
			onLoad: function (_ace) {
				$scope._ace = _ace;
				// HACK to have the ace instance in the scope...
				$scope.modeChanged = function () {
					_ace.getSession().setMode("ace/mode/" + $scope.sitd.type.toLowerCase());
				};

			}
		};
		Text.get({id: $routeParams.textId}).$promise.then(
                                //Success
                                function(data) {
                                	$scope.sitd = data;
                                	$scope._ace.getSession().setMode("ace/mode/" + data.type.toLowerCase());

                                },

                                function(error) {
                                	console.log(error);
                                }
                                );
		$scope.save = function(){
			Text.update({id: $routeParams.textId},{text:$scope.sitd}).$promise.then(
                                //Success
                                function(data) {
                                	$location.path('/my-sitds');

                                },

                                function(error) {
                                	console.log(error);
                                }
                                );
		};
	}
	var SitdViewController = function($routeParams,$scope,Text,$location,marked){
		marked.setOptions({gfm: true});
		Text.get({id: $routeParams.textId}).$promise.then(
                                //Success
                                function(data) {
                                	$scope.sitd = data;

                                },

                                function(error) {
                                	console.log(error);
                                }
                                );
	}
	var SitdPublicController = function($routeParams,$scope,Text,$location,marked,Page){
		marked.setOptions({gfm: true});
		Text.get({id: $routeParams.textId}).$promise.then(
                                //Success
                                function(data) {
                                        Page.setTitle(data.title);
                                	$scope.sitd = data;

                                },

                                function(error) {
                                	console.log(error);
                                }
                                );
	}
	
	angular.module(moduleName).controller('SitdController', ['$scope','Text','$location', SitdController]);
	angular.module(moduleName).controller('SitdEditController', ['$routeParams','$scope','Text','$location', SitdEditController]);
	angular.module(moduleName).controller('SitdViewController', ['$routeParams','$scope','Text','$location','marked', SitdViewController]);
	angular.module(moduleName).controller('SitdPublicController', ['$routeParams','$scope','Text','$location','marked','Page', SitdPublicController]);
})();
