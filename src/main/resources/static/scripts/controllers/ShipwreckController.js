(function() {
    angular
        .module('app')
        .controller('ShipwreckController', ['$scope', 'GoogleMapApi'.ns(), '$http', '$sce', ShipwreckController]);

    function ShipwreckController($scope, GoogleMapApi, $http, $sce) {
        var vm = this;
        vm.startAjaxSpinner = startAjaxSpinner;
        vm.shipwrecks = [];
        vm.selectedShipwreck = null;
        vm.selectShipwreck = selectShipwreck;
        vm.isShipwreckSelected = isShipwreckSelected;

        $scope.markers = [];

        GoogleMapApi.then(function (maps) {
            vm.mapSpinner = vm.startAjaxSpinner("googleMapContainer", "25%");

            $scope.map = {
                center: {
                    latitude: 43.13,
                    longitude: 27.55
                },
                zoom: 3,
                minZoom: 3
            };

            $http.get('/shipwrecks').success(function (data) {
                vm.shipwrecks = data;

                for (var i = 0; i < data.length; i++) {
                    $scope.markers.push((
                    {id: i,
                        coords: {latitude: data[i].latitude,
                            longitude: data[i].longitude},
                        options: {title: data[i].name }
                    }
                        ));
                }

                vm.mapSpinner.stop();
            });
        });

        // Stop the ajax spinner on the Wikipedia iframe when the iframe has loaded
        $("#wikipediaFrame").on("load", function () {
            vm.spinner && vm.spinner.stop();
        });

        function startAjaxSpinner(elementId, leftPosition) {
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
        }

        /**
         * @returns {boolean} true if one of the shipwreck locations is selected,
         *                    false if nothing has been selected (yet)
         */
        function isShipwreckSelected() {
            return this.selectedShipwreck != null;
        }

        /**
         * Shows details of the shipwreck the user has clicked on.
         *
         * @param marker the Google Maps marker that was clicked
         */
        function selectShipwreck(marker) {
            var wikipediaPage = this.shipwrecks[marker.id].name.replace(/ /g, '_');

            if(!this.selectedShipwreck || wikipediaPage != this.selectedShipwreck.wikipediaPage) {
                this.selectedShipwreck = this.shipwrecks[marker.id];

                if(!this.spinner) this.spinner = this.startAjaxSpinner("shipwrecks", "75%");
                else this.spinner.spin(document.getElementById("shipwrecks"));

                var newShipwreckLink = $sce.trustAsResourceUrl("http://en.wikipedia.org/wiki/" + wikipediaPage + "?printable=yes");

                this.selectedShipwreck.link = newShipwreckLink;
                this.selectedShipwreck.wikipediaPage = wikipediaPage;
            }
        }
    }
})();