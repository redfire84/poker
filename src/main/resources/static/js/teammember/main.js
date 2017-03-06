(function(){
	var app = angular.module('app');
	
	var TeamMemberController = function($scope, $location, $http, $stomp, $timeout, $log, session) {
		
		$scope.createTeamMember = function() {
			teamMember = {
				name: $scope.name,
				scrumMaster: {
					id: $scope.smId
				}
			};
				
			$http.post('/api/teammember/create', teamMember)
				.then(function(response) {
					session.userName = response.data.name,
					session.smId = response.data.scrumMaster.id
					
					$location.path('/scrummaster/' + response.data.scrumMaster.id + '/teammember/' + response.data.id + '/play')
					
				}, function(response) {
					$log.error(response)
				});
		}
	};
	
	app.controller('TeamMemberController', TeamMemberController)
}());