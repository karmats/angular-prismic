angular.module('prismic.io', [])
    .value('PrismicBackend', function () {
        return window.Prismic;
    })
    .provider('Prismic', function(PrismicBackend){

        //'https://lesbonneschoses.prismic.io/api'
        var _APIEndpoint = '';

        this.setAPIEndpoint = function (endpoint) {
            _APIEndpoint = endpoint;
        };

        this.$get = function () {

            var _accesToken = '',
                _setAccessToken = function setAccessToken(token) {
                    _accesToken = token;
                },

                _clientId = '',
                _setClientId = function setClientId(clientId) {
                    _clientId = clientId;
                },

                _clientSecret = '',
                _setClientSecret = function setClientSecret(clientSecret) {
                    _clientSecret = clientSecret;
                };

            return {
                setAccessToken: _setAccessToken,
                setClientId: _setClientId,
                setClientSecret: _setClientSecret
            }
        }
    });