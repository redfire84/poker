(function(){
	var app = angular.module('app');
	
	var TeamMemberPlayController = function($scope, $location, $routeParams, $http, $stomp, $timeout, $interval, $log, session) {
		
		$scope.story = null;
		$scope.playing = false;
		$scope.countdown = 0;
		
		(function init() {
            $stomp.connect("/ws")
            	.then(function(frame) {
            		$stomp.subscribe('/topic/sm/story', function(data) {
            			$scope.handleStory(data);
            			
            		});
            	});
        })();
		
		$scope.handleStory = function(data) {
			if (data.scrumMaster.id == $routeParams.smid) {
				
				$timeout(function() {
					$scope.story = data;
					$scope.playing = true;
				});
				
				/*var timer = $interval(function() {
					
				}, 1000);*/
				
				$timeout(function() {
					
					storyPoint = {
						scrumMaster: {
							id: $routeParams.smid
						},
						teamMember: {
							id: $routeParams.tmid
						},
						point: $scope.story['point']
					};
					
					$timeout(function() {
						$scope.playing = false;
    				});
					
					$http.post('/api/storypoint/create', storyPoint)
    					.then(function(response) {
    						// points posted
    					}, function(response) {
    						$log.error(response)
    					});
				}, 5000);
			}
		};
		
		$scope.storyPoint = function(point) {
			if ($scope.playing) {
				$scope.story['point'] = point;
			}
		};
	};
	
	app.controller('TeamMemberPlayController', TeamMemberPlayController)
}());