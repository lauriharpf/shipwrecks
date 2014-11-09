(function() {
    var app = angular.module('app', ['google-maps'.ns()]);

    // Configure the Angular-Google-Maps provider
    app.config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
        GoogleMapApi.configure({
            key: 'AIzaSyDWOU36_aLESVSSCFsrk4WdH9Q1mXdamgo',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }]);

    app.controller('ShipwreckController',
        ['$scope', 'GoogleMapApi'.ns(), '$http', function($scope, GoogleMapApi, $http) {
            var controller = this;
            $scope.markers = [];

            GoogleMapApi.then(function(maps) {
                $scope.map = {
                    center: {
                        latitude: 63.45,
                        longitude: 67.37
                    },
                    zoom: 2
                };

                $http.get('/shipwrecks').success(function(data) {
                    controller.shipwrecks = data;

                    for(var i=0; i < data.length; i++) {
                        $scope.markers.push((
                            {id: i,
                             coords: {latitude: data[i].latitude,
                                      longitude: data[i].longitude},
                             options: {title: data[i].name }}
                        ));
                    }
                });

            });
    }]);
})();