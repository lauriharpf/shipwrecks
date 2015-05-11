/**
 * Created by Mattia on 4/20/15.
 */

(function() {
    angular
        .module('app')
        .directive('userHeader', ['authenticationService', '$timeout', UserHeader]);

    function UserHeader(authService, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'templates/userHeader.html',
            link: function(scope, element, attrs) {
                scope.buttonText = 'Sign In';
                scope.auth = authService;
            }
        };
    }
})();