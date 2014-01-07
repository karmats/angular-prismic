angular.module('prismic.io', [])
    .provider('Prismic', function(){

        var PrismicBackend = window.Prismic;

        this.$get = function ($http) {

            var _accessToken = '',
                _setAccessToken = function setAccessToken(token) {
                    _accessToken = token;
                },

                _clientId = '',
                _setClientId = function setClientId(clientId) {
                    _clientId = clientId;
                },

                _clientSecret = '',
                _setClientSecret = function setClientSecret(clientSecret) {
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

            var requestHandler = function (url, cb) {
                console.log(Array.prototype.slice.call(arguments));

                $http.get(url).then(function (response) {
                    console.log(response);
                    cb(response.data);
                });
            };

            var getApiHome = function(callback) {
                PrismicBackend.Api(_APIEndpoint, callback, _accessToken, requestHandler);
            };

            var buildContext = function(ref, callback) {
                // retrieve the API
                getApiHome(function(api) {
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


            //////////////


            return {
                setAccessToken: _setAccessToken,
                setClientId: _setClientId,
                setClientSecret: _setClientSecret,
                setAPIEndpoint: _setAPIEndpoint,
                get: withPrismic
            }
        }
    });