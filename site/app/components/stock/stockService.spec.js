'use strict';

describe("stock", function() {
    var stock;

    beforeEach(module('StocksplosionApp'));

    beforeEach(inject(function(_stock_){
        stock = _stock_;
    }));

    it('should calculate averages', function() {
        var data1 = [1,2,3];
        var data2 = [5];

        expect(stock.calcAverage(data1)).toEqual(2);
        expect(stock.calcAverage(data2)).toEqual(5);
    });

    it('should generate advice', function() {
        expect(stock.calcAdvice(1.1, 1.0)).toEqual('sell');
        expect(stock.calcAdvice(1.0, 1.0)).toEqual('hold');
        expect(stock.calcAdvice(0.9, 1.0)).toEqual('buy');
    });

    it('should calculate averages correctly', function() {
        var sell = [10,20];
        var buy = [10,5];
        var hold = [10,10];

        expect(stock.analyzeStock(sell)).toEqual('sell');
        expect(stock.analyzeStock(hold)).toEqual('hold');
        expect(stock.analyzeStock(buy)).toEqual('buy');
        expect(stock.analyzeStock([])).toEqual('nodata');
    });

    it('should populate graph data', function() {
        var company = {
            'prices': {
                '0101': 10,
                '0102': 11,
                '0103': 12,
            }
        };
        var graphData = stock.populateGraphData(company);

        expect(graphData.data).toEqual([[10,11,12]]);
        expect(graphData.labels).toEqual(['0101','0102','0103']);
        expect(graphData.advice).toEqual('sell');
        expect(graphData.current).toEqual(12);
        expect(graphData.min).toEqual(10);
        expect(graphData.max).toEqual(12);
        expect(graphData.avg).toEqual(11);
    });

});
