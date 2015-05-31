var posterSvc = angular.module('posterSvc', []);

posterSvc.factory('SetupPersistSvc', function(Restangular) {
	console.log("SetupPersistSvc==>");
	return Restangular.service('app/setup/persist');
});
posterSvc.factory('ListAllService', function(Restangular) {
	console.log("ListAllService==>");
	return Restangular.service('app/setup/listall');
});
