angular.module('prismic.io', []).provider('Prismic', function(){

    //'https://lesbonneschoses.prismic.io/api'
    var _APIEndpoint = '';

    this.setAPIEndpoint = function (endpoint) {
        _APIEndpoint = endpoint;
    };
    
    this.$get = function () {

        var _setAccessToken = function setAccessToken(token) {

            },

            _setClientId = function setClientId(clientId) {

            },

            _setClientSecret = function setClientSecret(clientSecret) {

            };

        return {
            setAccessToken: _setAccessToken,
            setClientId: _setClientId,
            setClientSecret: _setClientSecret
        }
    }
});