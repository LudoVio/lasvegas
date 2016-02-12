/**
 * Represente a place.
 */

var id = 0;

module.exports = function (parent, place) {
    var self = this;

    self.id = id++;
    self.name = place.name;
    self.location = place.location;
    self.coords = place.coords;

    self.selected = ko.observable(false);

    // Activate or cancel the animation of the marker depending of the value of self.selected
    // Open or close the infowindow too
    function handleSelection () {
        if(self.marker) {
            if(self.selected()) {
                self.marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                    self.marker.setAnimation(null);
                }, 2150);
                self.infowindow.open(map, self.marker);
            } else {
                self.marker.setAnimation(null);
                self.infowindow.close();
            }
        }

        if(self.selected()) {
            parent.onPlaceSelected(self);
        }
    }

    // Watch self.selected for change and call self.handleSelection
    self.selected.subscribe(handleSelection);

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
                handleSelection();
            } else {
                self.marker.setMap(null);
            }
        }
    });

    // Set self.visible = search in self.name
    self.filter = function (search) {
        self.visible(self.name.toLowerCase().indexOf(search) > -1);
    };

    // Called when the Google Map is loaded
    self.onMapLoaded = function () {
        var coords = self.coords.split(',');
        var lat = coords[1];
        var lng = coords[0];

        self.marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            title: self.name
        });

        if(self.visible()) {
            self.marker.setMap(map);
        }

        // Bind a click event on the marker to toggle selection
        self.marker.addListener('click', self.toggleSelected);

        // Create an InfoWindow
        var contentString =
            '<div class="info-window">'+
            '<p class="info-window__name">'+
            place.name +
            '</p>'+
            '<p class="info-window__location">'+
            place.location +
            '</p>'+
            '<div '+
            'class="info-window__button" data-toggle="modal" data-target="#modal" data-place="' + self.id +'">'+
            '<span class="info-window__icon glyphicon glyphicon-info-sign" aria-hidden="true"></span> More Informations</div>'+
            '</div>';

        self.infowindow = new google.maps.InfoWindow({
            content: contentString
        });
    };
};
