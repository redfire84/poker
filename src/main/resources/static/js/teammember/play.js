(function(){
	var app = angular.module('app');
	
	var TeamMemberPlayController = function($scope, $location, $routeParams, $http, $stomp, $timeout, $interval, $log, session) {
		
		$scope.story = null;
		
		(function init() {
            $stomp.connect("/ws")
            	.then(function(frame) {
            		$log.info(frame);
            		$stomp.subscribe('/topic/sm/story', function(data) {
            			if (data.scrumMaster.id == $routeParams.smid) {
            				$timeout(function() {
            					$scope.story = data;
            				});
            			}
            		});
            	});
        })();
	};
	
	app.controller('TeamMemberPlayController', TeamMemberPlayController)
}());