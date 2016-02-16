'use strict';

describe("App configuration", function() {
    var RestangularProvider;

    beforeEach(function() {
        module('restangular', function(_RestangularProvider_) {
            RestangularProvider = _RestangularProvider_;
            spyOn(_RestangularProvider_, 'setBaseUrl').and.callThrough();
        });
    });

    beforeEach(module('StocksplosionApp'));
    beforeEach(function(){
        inject();
    });

    it('api url is set correctly', function() {
        expect(RestangularProvider.setBaseUrl).toHaveBeenCalledWith('http://stocksplosion.apsis.io/api')
    });

});