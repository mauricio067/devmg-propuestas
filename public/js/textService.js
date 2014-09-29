(function () {
	'use strict';
	var moduleName =  "TextSrvc";
	angular.module(moduleName, ['ngResource']);
	function Text ($resource, BaseUrl) {
		return $resource(BaseUrl+'/texts/:id', {"id": '@_id'},{
			'update': { method:'PUT' }}
			);
	}
	
	angular
	.module(moduleName)
	.constant('BaseUrl', 'http://localhost:3000')
	.factory('Text', Text);
})();