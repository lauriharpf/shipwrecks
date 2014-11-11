(function () {
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
        ['$scope', 'GoogleMapApi'.ns(), '$http', function ($scope, GoogleMapApi, $http) {
            var controller = this;
            this.shipwrecks = [];
            this.selectedShipwreck = null;
            $scope.markers = [];

            GoogleMapApi.then(function (maps) {
                $scope.map = {
                    center: {
                        latitude: 4.22,
                        longitude: 18.35
                    },
                    zoom: 2
                };

                $http.get('/shipwrecks').success(function (data) {
                    controller.shipwrecks = data;

                    for (var i = 0; i < data.length; i++) {
                        $scope.markers.push((
                        {id: i,
                            coords: {latitude: data[i].latitude,
                                longitude: data[i].longitude},
                            options: {title: data[i].name }
                        }
                            ));
                    }
                });
            });

            /**
             * @returns {boolean} true if one of the shipwreck locations is selected,
             *                    false if nothing has been selected (yet)
             */
            this.isShipwreckSelected = function () {
                return this.selectedShipwreck != null;
            };

            /**
             * Shows details of the shipwreck the user has clicked on.
             *
             * @param marker the Google Maps marker that was clicked
             */
            this.selectShipwreck = function (marker) {
                this.selectedShipwreck = this.shipwrecks[marker.id];
            };
        }]);
})();