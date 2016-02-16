'use strict';

angular.module('StocksplosionApp')
    .controller('stockController', function ($scope, Restangular, stock) {
        var errors = {};

        Restangular.all('company').getList().then(function(companies) {
            $scope.companies = companies;
        }), function(error) {
            errors['companies'] = error;
        };

        $scope.companySelected = function(selected) {
            var window = stock.selectWindow(30);
            Restangular.one('company', selected.title)
                .get({startdate:window.start, enddate:window.end})
                .then(function(company) {
                    $scope.graph = stock.populateGraphData(company);
                }), function(error) {
                $scope.errors['company'] = error;
                };
        };
    });
