/**
 * Model that represente a place.
 */

module.exports = function (data) {
    var self = this;
    var coords = data.coords.split(',');

    self.name = data.name;
    self.location = data.location;
    self.lat = coords[1];
    self.lng = coords[0];

    self.selected = ko.observable(false);
    // Activate or cancel the animation of the marker depending of the value of self.selected
    // Open or close the infowindow too
    self.handleSelection = function () {
        if(self.marker) {
            if(self.selected()) {
                self.marker.setAnimation(self.animationMode);
                self.infowindow.open(map, self.marker);
            } else {
                self.marker.setAnimation(null);
                self.infowindow.close();
            }
        }
    };
    // Watch self.selected for change and call self.handleSelection
    self.selected.subscribe(self.handleSelection);

    // Toggle self.selected
    self.toggleSelected = function () {
        self.selected(! self.selected());
    };

    self.visible = ko.observable(true);
    // Show or hide the marker depending of the value of self.visible
    self.visible.subscribe(function(value) {
        if(self.marker) {
            if(value) {
                self.marker.setMap(map);
                self.handleSelection();
            } else {
                self.marker.setMap(null);
            }
        }
    });
};
