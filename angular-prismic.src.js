angular.module('prismic.io', [])
    .constant('PrismicBackend', function () {
        return window.Prismic;
    })
    .provider('Prismic', function(PrismicBackend){

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
            Prismic.Api(Configuration.apiEndpoint, callback, sessionStorage.getItem('ACCESS_TOKEN'));
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
                        var token = sessionStorage.getItem('ACCESS_TOKEN');
                        return {
                            accessToken: token,
                            hasPrivilegedAccess: !!token
                        }
                    },

                    linkResolver: function(doc) {
                        return Configuration.linkResolver(ctx, doc);
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

        this.$get = function () {

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

            return {
                setAccessToken: _setAccessToken,
                setClientId: _setClientId,
                setClientSecret: _setClientSecret,
                setAPIEndpoint: _setAPIEndpoint
            }
        }
    });