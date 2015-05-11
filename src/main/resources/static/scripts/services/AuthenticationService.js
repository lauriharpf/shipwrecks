/**
 * Created by Mattia on 4/16/15.
 */

(function() {
    angular
        .module('app')
        .factory('authenticationService', ['$rootScope', '$http', '$window', AuthenticationService]);

    function AuthenticationService($rootScope, $http, $window) {
        if (typeof location.origin === 'undefined')
            location.origin = location.protocol + '//' + location.host;

        var service = {
            signedIn: false,
            signIn: SignIn,
            signOut: SignOut,
            config: {
                endPoint: 'https://accounts.google.com/o/oauth2/auth',
                clientId: '487816782475-nscq0o4e70nrcvbq6iappn11mr5ml0ka.apps.googleusercontent.com',
                responseType: 'code',
                scope: 'openid profile',
                redirectUri: location.origin+'/oauth2callback'
            },
            getAuthUrl: getAuthUrl
        };

        $http.get('/state').success(function(data) {
            service.config.state = data.state;
            service.signedIn = data.signedIn;
        });

        return service;

        function SignIn() {
            $window.location.href = service.getAuthUrl();
        }

        function SignOut() {
            $window.location.href = '/logout';
        }

        function getAuthUrl() {
            var url = service.config.endPoint;
            url += '?client_id='+service.config.clientId;
            url += '&response_type='+service.config.responseType;
            url += '&scope='+service.config.scope;
            url += '&redirect_uri='+service.config.redirectUri;
            url += '&state='+service.config.state;

            return url;
        }
    }
})();