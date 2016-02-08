/*
 * Code for Google Map.
 */

/* global google, gmap */

module.exports = function (octopus) {
    return function () {
        // Create the map
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 36.175094, lng: -115.156304},
            zoom: 11
        });

        // Patch the octopus.places to add a Marker property
        for (var i = 0, length = octopus.places().length ; i < length ; i++) {
            var place = octopus.places()[i];
            place.marker = new google.maps.Marker({
                position: new google.maps.LatLng(place.lat, place.lng),
                title: place.name
            });

            // Show the visible ones, in case the user filter the list before the map is loaded
            // It will also animate them if they are selected
            if(place.visible()) {
                place.marker.setMap(map);
            }

            // Make Animation.BOUNCE a property of place, so they don't depend on Google Map
            place.animationMode = google.maps.Animation.BOUNCE;
            // Bind a click event on the marker to toggle selection
            place.marker.addListener('click', place.toggleSelected);

            // Create and InfoWindow
            var contentString =
                '<div class="info-window">'+
                '<p id="info-window__name">'+
                place.name +
                '</p>'+
                '<p id="info-window__location">'+
                place.location +
                '</p>'+
                '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal" data-place="' + i +'">'+
                '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> More Infos</button>'+
                '</div>';

            place.infowindow = new google.maps.InfoWindow({
                content: contentString
            });
        }

        // Watch event 'modal open' and send the place id to the octopus
        $('#modal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var place_id = parseInt(button.data('place')); // The place id found in the data attribute
            octopus.setInfosPlace(place_id);
        })
    };
};
