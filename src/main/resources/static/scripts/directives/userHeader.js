/**
 * Created by Mattia on 4/20/15.
 */

(function() {
    angular
        .module('app')
        .directive('userHeader', ['authenticationService', UserHeader]);

    function UserHeader(authService) {
        return {
            restrict: 'E',
            templateUrl: 'templates/userHeader.html',
            link: function(scope, element, attrs) {
                scope.buttonText = 'Sign In';
                scope.clickHandler = clickHandler;
                scope.auth = authService;

                scope.$on('user:statusChange', function(event, data) {
                    if(authService.signedIn)
                        scope.buttonText = 'Sign Out';
                    else
                        scope.buttonText = 'Sign In';
                    scope.$apply();
                });

                function clickHandler() {
                    if(authService.signedIn)
                        auth2.signOut();
                    else
                        auth2.signIn();
                }
            }
        };
    }
})();