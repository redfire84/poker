(function(){
	var app = angular.module('app');
	
	var TeamMemberPlayController = function($scope, $location, $routeParams, $http, $stomp, $timeout, $interval, $log, session) {
		
		$scope.story = null;
		$scope.playing = false;
		$scope.countdown = 0;
		
		(function init() {
			$http.get('/api/teammember/' + $routeParams.tmid + '/scrummaster/' + $routeParams.smid)
				.then(function(response) {
					session.userName = response.data.name;
					session.smId = response.data.scrumMaster.id;
					
				}, function(response) {
					$log.error(response)
				});
			
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
					$scope.countdown = 5;
				});
				
				var timer = $interval(function() {
					$timeout(function() {
						$scope.countdown --;
					});
				}, 1000);
				
				$timeout(function() {
					
					$timeout(function() {
						$scope.playing = false;
						$interval.cancel(timer);
    				});
					
					_createStoryPoint($scope.story['point']);
				}, 5000);
			}
		};
		
		$scope.storyPoint = function(point) {
			if ($scope.playing) {
				$scope.story['point'] = point;
				_createStoryPoint(point);
			}
		};
		
		_createStoryPoint = function(point) {
			storyPoint = {
				scrumMaster: {
					id: $routeParams.smid
				},
				teamMember: {
					id: $routeParams.tmid
				},
				point: point
			};
			
			$http.post('/api/storypoint/create', storyPoint)
				.then(function(response) {
					// points posted
				}, function(response) {
					$log.error(response)
				});
		};
	};
	
	app.controller('TeamMemberPlayController', TeamMemberPlayController)
}());