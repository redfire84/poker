(function(){
	var app = angular.module('app', ['ngRoute', 'ngStomp', 'ui.bootstrap']);
	
	app.config(function($routeProvider, $locationProvider, $logProvider) {
		$logProvider.debugEnabled(true);
		
		$routeProvider
			.when('/play', {
				templateUrl: '/html/play.html'
			})
			.when('/scrummaster', {
				templateUrl: '/html/scrummaster/main.html',
			})
			.when('/scrummaster/:smid/play', {
				templateUrl: '/html/scrummaster/play.html'
			})
			.when('/teammember', {
				templateUrl: '/html/teammember/main.html'
			})
			.when('/scrummaster/:smid/teammember/:tmid/play', {
				templateUrl: '/html/teammember/play.html'
			})
			.otherwise({
				redirectTo: '/play'
			});
		
		// remove # from uri
		//$locationProvider.html5Mode(true);
	});
	
	app.factory('session', function() {
		return {
			session: {}
		};
	});
	
}());