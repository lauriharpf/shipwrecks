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
        ['$scope', 'GoogleMapApi'.ns(), '$http', '$sce', function ($scope, GoogleMapApi, $http, $sce) {
            this.startAjaxSpinner = function (elementId, leftPosition) {
                var opts = {
                    lines: 13, // The number of lines to draw
                    length: 20, // The length of each line
                    width: 10, // The line thickness
                    radius: 30, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    color: "#000", // #rgb or #rrggbb or array of colors
                    speed: 1, // Rounds per second
                    trail: 60, // Afterglow percentage
                    shadow: false, // Whether to render a shadow
                    hwaccel: false, // Whether to use hardware acceleration
                    className: 'spinner', // The CSS class to assign to the spinner
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    top: '50%', // Top position relative to parent
                    left: leftPosition // Left position relative to parent
                };
                return new Spinner(opts).spin(document.getElementById(elementId));
            };

            var controller = this;
            this.shipwrecks = [];
            this.selectedShipwreck = null;
            $scope.markers = [];

            GoogleMapApi.then(function (maps) {
                controller.mapSpinner = controller.startAjaxSpinner("googleMapContainer", "25%");

                $scope.map = {
                    center: {
                        latitude: 43.13,
                        longitude: 27.55
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

                    controller.mapSpinner.stop();
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

                var wikipediaPage = this.selectedShipwreck.name.replace(/ /g, '_');
                this.spinner = this.startAjaxSpinner("shipwrecks", "75%");
                this.selectedShipwreck.link =
                    $sce.trustAsResourceUrl("http://en.wikipedia.org/wiki/" + wikipediaPage + "?printable=yes");
            };

            // Stop the ajax spinner on the Wikipedia iframe when the iframe has loaded
            $("#wikipediaFrame").on("load", function () {
                controller.spinner && controller.spinner.stop();
            });
        }]);
})();