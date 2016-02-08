'use strict';

var $ = require('jquery');
var ko = require('knockout');
var places = require('./places');
var Octopus = require('./octopus');

ko.applyBindings(new Octopus(places));

// Google Map
window.map = undefined;
window.initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
};
