/*
 * Main Javascript file.
 */

'use strict';

var $ = require('jquery');
var ko = require('knockout');
var places = require('./places');
require('./customBindings')(ko);
var Octopus = require('./octopus');
var octopus = new Octopus(places);
var googlemap = require('./googlemap')(octopus);

// Put the octopus/controller/viewmodel at work
ko.applyBindings(octopus);

// Create a global variable to keep the Google Map referenced
// And a global function to use as a jsonp callback
window.map = undefined;
window.initMap = googlemap;
