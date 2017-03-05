(function(){
	var app = angular.module('app');
	
	var NavController = function($scope, $location) {
		$scope.isActive = function(path) {
			return path === $location.path();
		}
	};
	
	app.controller('NavController', NavController);
}());