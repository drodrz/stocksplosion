var myApp = angular.module('StocksplosionApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'restangular',
])
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl("http://stocksplosion.apsis.io/api/");
    })
    .config(function($httpProvider, $interpolateProvider, $routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "app/components/home/homeView.html",
            controller: "homeController",
        })
        .otherwise({redirectTo: '/'});
    })
