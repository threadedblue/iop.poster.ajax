var posterSvc = angular.module('posterSvc', []);

posterSvc.factory('SetupService', function(Restangular) {
	console.log("SetupService==>");
	return Restangular.service('app/setup');
});
posterSvc.factory('FormService', function(Restangular) {
	console.log("FormService==>");
	return Restangular.service('app/form');
});
