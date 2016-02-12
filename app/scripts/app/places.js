/**
 * Places
 * Takes care of the list of places, filtering, selecting
 */

var Place = require('./place');

module.exports = function (places) {
    var self = this;

    // List of Place
    self.places = ko.observableArray(places.map(function (placeData) {
        return new Place(self, placeData);
    }));

    // Unselect all places
    self.unselectAllPlacesExcept = function (except) {
        for (var i = 0, length = self.places().length ; i < length ; i++) {
            if(self.places()[i] !== except) {
                self.places()[i].selected(false);
            }
        }
    };

    // Call .filter() on each Place
    self.filter = function (search) {
        search = search.toLowerCase();
        for (var i = 0, length = self.places().length ; i < length ; i++) {
            self.places()[i].filter(search);
        }
    };

    // Called when the Google Map is loaded
    self.onMapLoaded = function () {
        // Tell self.places that the map is here
        for (var i = 0, length = self.places().length ; i < length ; i++) {
            self.places()[i].onMapLoaded();
        }
    };
};
