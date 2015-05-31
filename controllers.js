var posterSetup = angular.module("posterSetup", []);

posterSetup.controller("SetupCtl", ["$scope", "$location", '$route', "SetupPersistSvc", "ListAllService", "Restangular",
		function($scope, $location, $route, SetupPersistSvc, ListAllService, Restangular) {
			console.log("SetupCtl==>");
			
			$scope.ListAll = function() {
				console.log("ListAll==>");
				$scope.posters = [];
				ListAllService.getList().then(function (new_posters) {
					Restangular.copy(new_posters, $scope.posters);
				});
				console.log($scope.posters);
				console.log("<==ListAll");
				$location.path("/listall");
			}
						
			$scope.FindOneById = function(id) {
				console.log("FindOneById==>");
				$scope.poster = null;
				ListAllService.one(id).then(function (new_poster) {
					Restangular.copy(new_poster, $scope.poster);
				});
				
				console.log("<==FindOneById");
			}
			
			$scope.FindOneByEmail = function(id) {
				console.log("FindOneByEmail==>");
				console.log("<==FindOneByEmail");
			}
			
			$scope.SetupPersist = function() {
				console.log("SetupPersist==>");
				SetupPersistSvc.post($scope.poster);
				console.log("email=" + $scope.poster.email);
				console.log("provider=" + $scope.poster.provider);
//				$location.path("/center");
				console.log("<==SetupPersist");
			};
			
			$scope.PaddedArray = function(array) {
//				console.log("PaddedArray==>");
				if (array === undefined) {
					array = [];
				} 
				for (var i = array.length; i < 5; i++) {
						array.push("");			
				}
				console.log(array);
//				console.log("<==PaddedArray");
				return array;
			};			
			console.log("<==SetupCtl");
}]);
posterCtl.controller("DatepickerCtrl", ["$scope", function($scope) {
	console.log("DatepickerCtrl==>");
	$("#from-txt").datepicker();
	$("#from-txt").on(
			"changeDate",
			function(event) {
				$("#from-txt").val(
						$("#from-txt").datepicker(
								'getFormattedDate'))
			});
	$("#to-txt").datepicker()
	$("#to-txt").on(
			"changeDate",
			function(event) {
				$("#to-txt").val(
						$("#to-txt").datepicker(
								'getFormattedDate'))
			});
	
	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();
	
	$scope.clear = function() {
		$scope.dt = null;
	};
	
	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return (mode === "day" && (date.getDay() === 0 || date
				.getDay() === 6));
	};
	
	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();
	
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
	
		$scope.opened = true;
	};
	
	$scope.dateOptions = {
		formatYear : "yy",
		startingDay : 1
	};
	
	$scope.formats = [ "dd-MMMM-yyyy", "yyyy/MM/dd",
			"dd.MM.yyyy", "shortDate" ];
	$scope.format = $scope.formats[0];
	console.log("<==DatepickerCtrl");
}]);

//posterCtl
//.controller(
//		"CenterCtl",
//		[
//				"$scope",
//				"$location",
//				"FormService",
//				function($scope, $location, FormService) {
//					console.log("CenterCtl==>");
//					$scope.Submit = function() {
//						console.log("Submit==>");
//						$scope.poster = FormService.save({
//							firstname : $scope.firstname,
//							lastname : $scope.lastname,
//							practitioner : $scope.practitioner,
//							foreground : $scope.foreground,
//							background : $scope.background,
//							from : $scope.from,
//							to : $scope.to,
//							beloved : $scope.beloved,
//							likes : $scope.likes
//						});
//						console.log("foreground=" + $scope.foreground);
//						console.log("background=" + $scope.background);
//						console.log("beloved=" + $scope.beloved);
//						$location.path("/poster");
//						console.log("<==Submit");
//					};
//					console.log("<==CenterCtl");
//				} ]);