angular.module('prismic.io', [])
    .factory('PrismicRequestHandler', function ($http) {
        return function requestHandler(url, cb) {
            $http.get(url).then(
                function (response) {
                    cb(null, response.data);
                },
                function(error) {
                    cb(error, null);
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
                getApiHome(function(error, api) {
                    var ctx = {
                        ref: (ref || api.data.master.ref),
                        api: api,
                        maybeRef: (ref && ref != api.data.master.ref ? ref : ''),
                        maybeRefParam: (ref && ref != api.data.master.ref ? '&ref=' + ref : ''),

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
                    ctx.api.form("everything").ref(ctx.ref).submit(function(error, docs) {
                        deferred.resolve(docs);
                    })
                });

                return deferred.promise;
            };

            var _query = function (predicate) {

                var deferred = $q.defer();

                withPrismic(function (ctx) {
                    ctx.api.form('everything').ref(ctx.ref).query(predicate).submit(function(error, results) {
                        deferred.resolve(results);
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