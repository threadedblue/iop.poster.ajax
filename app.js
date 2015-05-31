var posterApp = angular.module('posterApp', ['restangular', 'ngRoute', 'colorpicker.module']);

posterApp.config(['$routeProvider', function($routeProvider) {
	 console.log("config==>");
	 $routeProvider.
	 when('/', {
	     templateUrl: "tpl/center.html",
	     controller: "SetupCtl"
	 }).
	 when('/listall', {
	     templateUrl: "tpl/listall.html",
	     controller: "SetupCtl"
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

posterApp.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/app');
  });

posterApp.config(function(RestangularProvider) {
    RestangularProvider.setRequestInterceptor(
      function(elem, operation, what) {        
        if (operation === 'post') {
          console.log("req Intercept==>");
          console.log(elem);
          console.log(operation);
          console.log(what);
          return elem;
        }
        return elem;
    });
  });

posterApp.controller("SetupCtl", ["$scope", "$location", '$route', "ListAllSvc", "FindByEmailSvc", "DeleteOneSvc", "PrintOneSvc", "PersistOneSvc", "Restangular",
                         function( $scope,   $location,   $route,   ListAllSvc,   FindByEmailSvc,   DeleteOneSvc,   PrintOneSvc,   PersistOneSvc,   Restangular) {
	console.log("SetupCtl==>");
	
	$scope.currentDate = new Date();
	
	$scope.ListAll = function() {
		console.log("ListAll==>");
		$scope.posters = [];
		$scope.actionResponse = undefined;
		ListAllSvc.getList().then(function (new_posters) {
			console.log("new")
			console.log(new_posters);
			Restangular.copy(new_posters, $scope.posters);
			console.log("scope")
			console.log($scope.posters);
		});
		console.log("<==ListAll");
		$location.path("/listall");
	}
	
	$scope.DeleteOne = function(poster) {
		console.log("DeleteOne==>");
		console.log(poster);
//		DeleteOneSvc.remove(poster);
		poster.remove().then(function() {
		var index = $scope.posters.indexOf(poster);
		if (index > -1) { 
		  $scope.posters.splice(index, 1);
		}
		});
		$scope.actionResponse = "Poster deleted.";
	}
	
	$scope.EditOne = function(poster) {
		console.log("EditOne==>");
		$scope.$parent.poster = poster;
		$scope.$parent.actionResponse = undefined;
		$location.path("/");
	}
		
	$scope.PrintOne = function(poster) {
		console.log("PrintOne==>");
		$scope.$parent.poster = poster;
		PersistOneSvc.post(poster);
		PrintOneSvc.get(poster.id);
		$location.path("/");
	}

	$scope.PersistOne = function() {
		console.log("PersistOne==>");
		if ($scope.poster != undefined) {
			PersistOneSvc.post($scope.poster);
			console.log("email=" + $scope.poster.email);
			console.log("provider=" + $scope.poster.provider);
			$scope.actionResponse = "Poster saved.";		
		} else {
			$scope.$parent.actionResponse = "Email is required";
			console.log($scope.actionResponse);
		}
		$location.path("/");
		console.log("<==PersistOne");
	};	
	
	$scope.FindOneById = function(id) {
		console.log("FindOneById==>");
		$scope.poster = null;
		ListAllSvc.get(id).then(function (new_poster) {
			Restangular.copy(new_poster, $scope.poster);
		});
		
		console.log("<==FindOneById");
	}
	
	$scope.FindOneByEmail = function(email) {
		console.log("FindOneByEmail==>");
		$scope.isemailused = true;
		FindByEmailSvc.one(email);
		console.log("<==FindOneByEmail");
	}
	
	$scope.validateEmail = function (email) {
		var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
		if (reg.test(email)) {
			return true; 
		} else {
			return false;
		}
	} 
	
	$scope.IsEmailUsed = function(email) {
		console.log(email);
		if (email !== undefined) {
		FindByEmailSvc.get(email.email).then(function (new_poster) {
			if (new_poster !== undefined) {
				return true;
			} else {
				return false;
			}
			}
		);
	}
	}
	
	$scope.PaddedArray = function(array) {
// console.log("PaddedArray==>");
		if (array === undefined) {
			array = [];
		} 
		for (var i = array.length; i < 5; i++) {
				array.push("");			
		}
		console.log(array);
// console.log("<==PaddedArray");
		return array;
	};			
	console.log("<==SetupCtl");
}]);

posterApp.factory('FindByEmailSvc', function(Restangular) {
	console.log("FindByEmailSvc==>");
	return Restangular.all('email');
});
posterApp.factory('ListAllSvc', function(Restangular) {
	console.log("ListAllSvc==>");
	return Restangular.service('listall');
});
posterApp.factory('DeleteOneSvc', function(Restangular) {
	console.log("DeleteOneSvc==>");
	return Restangular.all('delete');
});
posterApp.factory('PrintOneSvc', function(Restangular) {
	console.log("PrintOneSvc==>");
	return Restangular.all('print');
});
posterApp.factory('PersistOneSvc', function(Restangular) {
	console.log("SetupPersistSvc==>");
	return Restangular.all('persist');
});