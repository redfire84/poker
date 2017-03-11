(function(){
	var app = angular.module('app');
	
	var TeamMemberPlayController = function($scope, $location, $routeParams, $http, $stomp, $timeout, $interval, $log, session) {
		
		$scope.story = null;
		
		(function init() {
            $stomp.connect("/ws")
            	.then(function(frame) {
            		$stomp.subscribe('/topic/sm/story', function(data) {
            			
            			if (data.scrumMaster.id == $routeParams.smid) {
            				
            				$timeout(function() {
            					$scope.story = data;
            				});
            				
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
                					$scope.story = null;
                				});
            					
            					$http.post('/api/storypoint/create', storyPoint)
	            					.then(function(response) {
	            						// points posted
	            					}, function(response) {
	            						$log.error(response)
	            					});
        					}, 5000);
            			}
            		});
            	});
        })();
		
		$scope.storyPoint = function(point) {
			if ($scope.story) {
				$scope.story['point'] = point;
			}
		};
	};
	
	app.controller('TeamMemberPlayController', TeamMemberPlayController)
}());