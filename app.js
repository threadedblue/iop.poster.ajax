var posterApp = angular.module('posterApp', ['restangular', 'ngRoute', 'posterCtl', 'posterSvc']);

posterApp.config(['$routeProvider', function($routeProvider) {
	 console.log("config==>");
	 $routeProvider.
	 when('/', {
	     templateUrl: "tpl/setup.html",
	     controller: "SetupCtl"
	 }).
	 when('/color', {
	     templateUrl: "tpl/center.html",
	     controller: "ColorCtl"
	 }).		
	 when('/center', {
	     templateUrl: "tpl/center.html",
	     controller: "CenterCtl"
	 }).		
	 when('/poster', {
	     templateUrl: "tpl/center.html",
	     controller: "FormCtl"
	 }).	
	 otherwise({redirectTo: function (routeParams, path, search) {
        console.log(routeParams);
        console.log(path);
        console.log(search);
        return "/";
	 }
	 });
	 console.log("<==config");
}]);