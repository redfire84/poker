(function(){
	var app = angular.module('app');
	
	var PlayController = function($scope, $log, session) {
		
		(function init() {
			session.userName = null;
			session.smId = null;
        })();
		
	};
	
	app.controller('PlayController', PlayController)
}());