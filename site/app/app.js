var stockApp = angular.module('StocksplosionApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'restangular',
    'angucomplete-alt',
    'chart.js',
])
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl("http://stocksplosion.apsis.io/api");
    })
    .config(function($httpProvider, $interpolateProvider, $routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "app/components/stock/stockView.html",
            controller: "stockController",
        })
        .otherwise({redirectTo: '/'});
    })
