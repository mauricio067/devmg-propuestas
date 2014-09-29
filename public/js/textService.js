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
	.constant('BaseUrl', 'http://http://devmg-propuestas.devmg.com:3001')
	.factory('Text', Text);
})();