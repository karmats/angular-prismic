angular.module('prismic.io', [])
    .factory('PrismicRequestHandler', function ($http) {
        return function requestHandler(url, cb) {
            $http.get(url).then(function (response) {
                cb(response.data);
            });
        };
    })
    .provider('Prismic', function(){

        this.$get = function ($http, $window, PrismicRequestHandler, $q) {

            var requestHandler = PrismicRequestHandler;
            var PrismicBackend = $window.Prismic;

            var _accessToken = '',
                _setAccessToken = function (token) {
                    _accessToken = token;
                },

                _clientId = '',
                _setClientId = function (clientId) {
                    _clientId = clientId;
                },

                _clientSecret = '',
                _setClientSecret = function (clientSecret) {
                    _clientSecret = clientSecret;
                },

                _APIEndpoint = '',
                _setAPIEndpoint = function (endpoint) {
                    _APIEndpoint = endpoint;
                };

            ///////////

            var parseQS = function(query) {
                var params = {},
                    match,
                    pl = /\+/g,
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
                while (match = search.exec(query)) {
                    params[decode(match[1])] = decode(match[2]);
                }
                return params;
            };

            var getApiHome = function(callback) {
                PrismicBackend.Api(_APIEndpoint, callback, _accessToken, requestHandler);
            };

            var buildContext = function(ref, callback) {
                // retrieve the API
                getApiHome(function(api) {
                    var ctx = {
                        ref: (ref || api.refs[0].ref),
                        api: api,
                        maybeRef: (ref && ref != api.refs[0].ref ? ref : ''),
                        maybeRefParam: (ref && ref != api.refs[0].ref ? '&ref=' + ref : ''),

                        oauth: function() {
                            var token = _accessToken;
                            return {
                                accessToken: token,
                                hasPrivilegedAccess: !!token
                            }
                        },

                        linkResolver: function(doc) {
                            return 'detail.html?id=' + doc.id + '&slug=' + doc.slug + ctx.maybeRefParam;
                        }
                    }
                    callback(ctx);
                });
            };

            var withPrismic = function(callback) {
                buildContext(queryString['ref'], function(ctx) {
                    callback.apply(window, [ctx]);
                });
            };

            var queryString = parseQS(window.location.search.substring(1));

            // Hash data
            var encodedHash = parseQS(window.location.hash.substring(1));


            var _get = function () {

                var deferred = $q.defer();

                withPrismic(function (ctx) {
                    console.log(ctx)
                    $http.get(ctx.api.forms.everything.action, { params: {'ref' : ctx.ref} }).then(function(docs) {
                        deferred.resolve(docs.data.results);
                    })
                });

                return deferred.promise;
            };

            var _query = function (predicate) {

                var deferred = $q.defer();

                withPrismic(function (ctx) {
                    $http.get(ctx.api.forms.everything.action, { params: {'ref' : ctx.ref, 'q' : predicate} }).then(function(results) {
                        deferred.resolve(results.data.results);
                    });
                });

                return deferred.promise;
            };


            return {
                setAccessToken: _setAccessToken,
                setClientId: _setClientId,
                setClientSecret: _setClientSecret,
                setAPIEndpoint: _setAPIEndpoint,
                get: _get,
                query: _query
            }
        }
    });