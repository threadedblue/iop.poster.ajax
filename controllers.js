var posterCtl = angular.module("posterCtl", []);

posterCtl.controller("SetupCtl", [ "$scope", "$location", "SetupService",
		function($scope, $location, SetupService) {
			console.log("SetupCtl==>");
			$scope.Setup = function() {
				console.log("Setup==>");
				SetupService.post({
					 email : $scope.email,
					 provider : $scope.provider
				});
				console.log("email=" + $scope.email);
				console.log("provider=" + $scope.provider);
				$location.path("/center");
				console.log("<==Setup");
			};
			console.log("<==SetupCtl");
		} ]);
posterCtl.controller("CenterCtl", [ "$scope", "$location", "FormService",
		function($scope, $location, FormService) {
			console.log("CenterCtl==>");
			$scope.Submit = function() {
				console.log("Submit==>");
				 $scope.poster = FormService.save({
				 name : $scope.name,
				 foreground : $scope.foreground,
				 background : $scope.background,
				 from : $scope.from,
				 to : $scope.to,
				 beloved : $scope.beloved,
				 likes : $scope.likes
				 });
				 console.log("foreground=" + $scope.foreground);
				 console.log("background=" + $scope.background);
				 console.log("beloved=" + $scope.beloved);
				$location.path("/poster");
				console.log("<==Submit");
			};
			console.log("<==CenterCtl");
		}]);
posterCtl.controller("ColorCtl", ["$scope", function($scope) {
	console.log("ColorCtl==>");
	$scope.Color = function(ground) {
		console.log("ground=" + ground);
		$("#" + ground).colorpicker().on("changeColor.colorpicker", function(e) {
			console.log("fbg change==>");
			var fbgcolor = e.color.toHex();
			$("#" + ground + "-hid").val(fbgcolor);
			$("#setup").css(ground, fbgcolor);
			console.log("<==fbg change");
		});
//		$("#background").colorpicker().on("changeColor.colorpicker", function(e) {
//			console.log("bg change==>");
//			var bgcolor = e.color.toHex();
//			$("#background-hid").val(bgcolor);
//			$("#setup").css("background", bgcolor);
//			console.log("<==bg change");
//		});
	};
	console.log("<==ColorCtl");
}]);
posterCtl
		.controller("DatepickerCtrl",
				function($scope) {
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
				});