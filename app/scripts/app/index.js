/**
 * The app.
 */

/* global map, google */

'use strict';

var ko = require('knockout');
var datas = require('./datas');
var Places = require('./places');
var Infos = require('./infos');

function App () {
    var self = this;

    self.mobileTriggerClicked = ko.observable(false);
    self.mobiletriggerToggleClicked = function () {
        self.mobileTriggerClicked(! self.mobileTriggerClicked());
    };

    self.places = new Places(self, datas.places);
    self.onPlaceSelected = function (place) {
        self.mobileTriggerClicked(false);
    };

    // Watch for change in the search input and send the value to self.places.filter()
    self.search = ko.observable('');
    self.search.subscribe(self.places.filter);

    self.infos = new Infos(datas.apis);

    // Called when the Google Map is loaded
    self.onMapLoaded = function () {
        // Create the map
        window.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 36.175094, lng: -115.156304},
            zoom: 11
        });

        // Create a global to save the LatLngBounds
        window.latLngBounds = new google.maps.LatLngBounds();

        // Tell self.places that the map is here
        self.places.onMapLoaded();

        // Set the zoom to be able to see all the marker, then center
        window.map.fitBounds(window.latLngBounds);
        window.map.setCenter(window.latLngBounds.getCenter());

        // Watch event 'modal open' and send the Place to self.infos
        $('#modal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var place_id = parseInt(button.data('place')); // The place id found in the data attribute
            self.infos.onOpen(self.places.places()[place_id]);
        });
    }
}

module.exports = function () {
    var app = new App();
    ko.applyBindings(app);

    // Create a global for Google Map callback
    window.onMapLoaded = app.onMapLoaded;

    return app;
};
