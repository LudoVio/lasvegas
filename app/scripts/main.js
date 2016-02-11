/*
 * Main Javascript file.
 */

'use strict';

// Load and create the app
var appFactory = require('./app');
var app = appFactory();

// open/close list of places on mobile
$('.sidebar-trigger').on('click', function(){
    $('.sidebar-trigger__icon').toggleClass('sidebar-trigger__icon--clicked');
    $('.sidebar').toggleClass('sidebar--visible');
});
