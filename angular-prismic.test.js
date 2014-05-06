'use strict';

describe('Provider configuration: prismicProvider configuration', function () {

    beforeEach(module('prismic.io'));

    it('should have a configuration API',
        inject(function(Prismic) {
            expect(typeof Prismic.setAPIEndpoint).toBe('function');
        })
    );
});

describe('Provider: prismicProvider', function () {

    var $rootScope, Prismic, $httpBackend, PrismicBackend;

    beforeEach(function () {

        PrismicBackend = jasmine.createSpy('PrismicBackend');

        module('prismic.io', function ($provide) {
            $provide.value('PrismicBackend', PrismicBackend);
        });

        inject(function (_$rootScope_, _Prismic_, _$httpBackend_) {
            $rootScope = _$rootScope_;
            Prismic = _Prismic_;
            $httpBackend = _$httpBackend_;
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return something', function () {
        expect(Prismic).toBeDefined();
    })
    
    it('should provide a custom resuest handler to the PismicBackend', function() {
        //https://github.com/prismicio/javascript-kit/blob/master/src/api.js#L192
    });

    describe('setAccessToken', function () {
        it('should have a setAccessToken function', function () {
            expect(typeof Prismic.setAccessToken).toBe('function');
        });

        /*it('should send the access token on requests to the API', function () {
            //TODO: Implement
            $httpBackend.expectGET('/auth').respond(201, '');
            Prismic.setAccessToken('');
            $httpBackend.flush();
        });*/
    });

    describe('OAuth', function () {
        it('should have a setCliendId function', function () {
            expect(typeof Prismic.setClientId).toBe('function');
        });

        /*it('should send the client id on requests to the API', function () {
            //TODO: Implement
            $httpBackend.expectGET('/auth').respond(201, '');
            Prismic.setCliendId('');
            $httpBackend.flush();
        });*/

        it('should have a setClientSecret function', function () {
            expect(typeof Prismic.setClientSecret).toBe('function');
        });

        /*it('should send the client secret on requests to the API', function () {
            //TODO: Implement
            $httpBackend.expectGET('/auth').respond(201, '');
            Prismic.setClientSecret('');
            $httpBackend.flush();
        });*/
    })
});