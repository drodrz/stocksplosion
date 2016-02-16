'use strict';

angular.module('StocksplosionApp')
    .service('stock', function stock($filter) {
        // Calculates the average value of data array
        var calcAverage = function(data) {
            var sum = 0;

            data.forEach(function(val) {
                sum += val;
            });
            var avg = sum / data.length;

            return avg;
        };

        // Returns hold, sell, or buy advice depending on ratio of specified value vs average
        var calcAdvice = function(val, avg) {
            var advice = 'hold';

            if (val/avg >= 1.1) {
                advice = 'sell';
            } else if (val/avg <= 0.9) {
                advice = 'buy';
            }

            return advice;
        };

        var service = {
            // Takes an array of prices, calculates the average, compares it to current price,
            // and returns buy, sell, trade
            'analyzeStock': function(prices) {
                if (prices.length == 0)
                    return 'nodata';

                var avg = calcAverage(prices);
                var current_val = prices.pop();
                return calcAdvice(current_val, avg);
            },
            // Generates start and end dates (start: today - days, end: today)
            'selectWindow': function(days) {
                var today = new Date();
                var start = new Date(today);
                start.setDate(today.getDate()-days);

                return {
                    'start': $filter('date')(start, 'yyyyMMdd'),
                    'end': $filter('date')(today, 'yyyyMMdd')
                };
            },
            // Takes company info and generates the necessary information to populate graph
            'populateGraphData': function(company) {
                var stock = this;

                var labels = [];
                var prices = [];
                for (var key in company.prices) {
                    labels.push(key);
                    prices.push(company.prices[key]);
                }

                return {
                    'labels': labels,
                    'data': [prices],
                    'advice': stock.analyzeStock(prices)
                };
            }
        };

        return service;
    });