(function(){
	var app = angular.module('app');
	
	var ScrumMasterPlayController = function($scope, $location, $routeParams, $http, $stomp, $timeout, $interval, $log, session) {
		
		$scope.teamMembers = [];
		$scope.storystarted = false;
		
		(function init() {
            $stomp.connect("/ws")
            	.then(function(frame) {
            		$stomp.subscribe('/topic/tm/join', function(data) {
            			if (data.scrumMaster.id == $routeParams.smid) {
            				$timeout(function() {
            					$scope.teamMembers.push(data);
            				});
            			}
            		});
            	});
        })();
		
		$scope.startStory = function() {
			$scope.storystarted = true;
			
			story = {
				scrumMaster: {
					id: $routeParams.smid
				}
			};
			
			$http.post('/api/story/create', story)
				.then(function(response) {
					$interval(function() {
						$scope.storystarted = false;
					}, 10000);
					
				}, function(response) {
					$log.error(response)
				});
		};
		
	};
	
	app.controller('ScrumMasterPlayController', ScrumMasterPlayController)
}());