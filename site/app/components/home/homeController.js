'use strict';

angular.module('StocksplosionApp')
    .controller('homeController', function ($scope, Restangular) {
        var errors = {};
        $scope.labels = [];

        Restangular.all('company').getList().then(function(companies) {
            console.log('Companies loaded');
            $scope.companies = companies;
        }), function(error) {
            console.log('Error loading companies');
            errors['companies'] = error;
        };

        //TODO: Calculate start, end date
        $scope.start = '20160101';
        $scope.end = '20160202';
        $scope.companySelected = function(selected) {
            Restangular.one('company', selected.description).get({startdate:$scope.start, enddate:$scope.end}).then(function(company) {
                $scope.company = company;
                $scope.labels = [];
                var prices = [];
                for (var key in company.prices) {
                    $scope.labels.push(key);
                    prices.push(company.prices[key]);
                }
                $scope.data = [ prices ];

                console.log($scope.labels);
                console.log($scope.data);
            });
        };



    });
