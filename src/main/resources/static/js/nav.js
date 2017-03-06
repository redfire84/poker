(function(){
	var app = angular.module('app');
	
	var NavController = function($scope, $log, session) {
		$scope.session = session;
	};
	
	app.controller('NavController', NavController);
}());