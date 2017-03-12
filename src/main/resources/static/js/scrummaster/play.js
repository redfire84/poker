(function(){
	var app = angular.module('app');
	
	var ScrumMasterPlayController = function($scope, $location, $routeParams, $http, $stomp, $timeout, $interval, $log, session) {
		
		$scope.teamMembers = [];
		$scope.storystarted = false;
		$scope.story = null;
		
		(function init() {
			$http.get('/api/scrummaster/' + $routeParams.smid)
				.then(function(response) {
					session.userName = response.data.name;
					session.smId = response.data.id;
					
				}, function(response) {
					$log.error(response)
				});
			
			$http.get('/api/teammember/sm/' + $routeParams.smid + '/list')
				.then(function(response) {
					$timeout(function() {
						if(response.data) {
							for (var i=0; i<response.data.length; i++) {
								$scope.teamMembers.push(response.data[i]);
							}
						}
					});
					
				}, function(response) {
					$log.error(response)
				});
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
			// reset
			for (var i=0; i<$scope.teamMembers.length; i++) {
				$scope.teamMembers[i]['storyPoint'] = null;
			}
			
			$scope.storystarted = true;
			
			story = {
				scrumMaster: {
					id: $routeParams.smid
				}
			};
			
			var subscription = null;
			$http.post('/api/story/create', story)
				.then(function(response) {
					$timeout(function() {
    					$scope.story = response.data;
    				});
					
            		subscription = $stomp.subscribe('/topic/tm/storypoint', function(data) {
            			if (data.scrumMaster.id == $routeParams.smid) {
            				$timeout(function() {
            					for (var i=0; i<$scope.teamMembers.length; i++) {
            						if ($scope.teamMembers[i].id == data.teamMember.id) {
            							$scope.teamMembers[i]['storyPoint'] = data;
            						}
            					}
            				});
            			}
            		});
					
				}, function(response) {
					$log.error(response)
				});
			
			$timeout(function() {
				if (subscription) {
					subscription.unsubscribe();
				}
				
				$scope.storystarted = false;
			}, 7000);
		};
		
	};
	
	app.controller('ScrumMasterPlayController', ScrumMasterPlayController)
}());