(function(){
	var app = angular.module('app');
	
	var ScrumMasterController = function($scope, $location, $http, $stomp, $timeout, $log, session) {
		
		$scope.createScrumMaster = function() {
			scrumMaster = {
				name: $scope.name
			};
				
			$http.post('/api/scrummaster/create', scrumMaster)
				.then(function(response) {
					session.userName = response.data.name;
					session.smId = response.data.id;
					
					$location.path('/scrummaster/' + response.data.id + '/play')
					
				}, function(response) {
					$log.error(response)
				});
		}
	};
	
	app.controller('ScrumMasterController', ScrumMasterController)
}());