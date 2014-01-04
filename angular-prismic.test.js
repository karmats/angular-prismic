'use strict';

describe('PrismicBackEnd', function () {
   it('should proxy window.Prismic', function() {
       
   }); 
});

describe('Provider configuration: prismicProvider configuration', function () {
    var prismicProvider, prismic;

    beforeEach(function(){
        module('prismic.io', function (_prismicProvider_) {
            prismicProvider = _prismicProvider_;
        });
    });

    it('should have a configuration API', function() {
        expect(typeof prismicProvider.setAPIEndpoint).toBe('function');
    });
});

describe('Provider: prismicProvider', function(){

    var $rootScope, Prismic, $httpBackend;

    beforeEach(function(){
        module('prismic.io', function (prismicProvider) {
        });

        inject(function(_$rootScope_, _Prismic_, _$httpBackend_){
            $rootScope = _$rootScope_;
            Prismic = _Prismic_;
            $httpBackend = _$httpBackend_;
        });
    });

    it('should return something', function(){
       expect(Prismic).toBeDefined();
    });

    describe('setAccessToken', function () {
        it('should have a setAccessToken function', function() {
            expect(typeof Prismic.setAccessToken).toBe('function');
        });

        it('should send the access token on requests to the API', function() {
            expect(true).toBeFalsy();
        });
    });

    describe('OAuth', function () {
        it('should have a setCliendId function', function() {
            expect(typeof Prismic.setCliendId).toBe('function');
        });

        it('should send the client id on requests to the API', function() {
            expect(true).toBeFalsy();
        });

        it('should have a setClientSecret function', function() {
            expect(typeof Prismic.setClientSecret).toBe('function');
        });

        it('should send the client secret on requests to the API', function() {
            expect(true).toBeFalsy();
        });
    })
});