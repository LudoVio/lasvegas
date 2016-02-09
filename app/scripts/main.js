/*
 * Main Javascript file.
 */

'use strict';

// Load and create the app
var appFactory = require('./app');
var app = appFactory();
// Create a global for Google Map callback
window.onMapLoaded = app.onMapLoaded;

// DEBUG
//octopus.setInfosPlace(0);
//$('<button data-toggle="modal" data-target="#modal"></button>').appendTo('body').click();
