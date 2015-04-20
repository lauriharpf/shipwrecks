/**
 * Created by Mattia on 4/16/15.
 */

(function() {
    angular
        .module('app')
        .factory('authenticationService', ['$rootScope', AuthenticationService]);

    function AuthenticationService($rootScope) {
        var service = {
            signedIn: false,
            userInfo: {},
            signIn: SignIn,
            signOut: SignOut
        };

        // configure the authentication
        gapi.load('auth2', function() {
            auth2 = gapi.auth2.init({
                client_id: '487816782475-nscq0o4e70nrcvbq6iappn11mr5ml0ka.apps.googleusercontent.com',
                fetch_basic_profile: true,
                scope: 'profile'
            });

            auth2.isSignedIn.listen(function(val) {
                if(val) {
                    service.signIn();
                } else {
                    service.signOut();
                }
            });
        });

        return service;

        function SignIn() {
            var profile = auth2.currentUser.get().getBasicProfile();

            service.signedIn = true;
            service.userInfo = {
                id: profile.getId(),
                name: profile.getName(),
                imageUrl: profile.getImageUrl(),
                email: profile.getEmail()
            };

            $rootScope.$broadcast('user:statusChange',true);
        }

        function SignOut() {
            service.signedIn = false;
            service.userInfo = {};

            $rootScope.$broadcast('user:statusChange',false);
        }
    }
})();