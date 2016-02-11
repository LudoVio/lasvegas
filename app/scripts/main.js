/*
 * Main Javascript file.
 */

'use strict';

// Load and create the app
var appFactory = require('./app');
var app = appFactory();

// open/close list of places on mobile
// TODO: put this to the view + modelView
var $ = require('jquery');
$('.sidebar-trigger').on('click', function(){
    $('.sidebar-trigger__icon').toggleClass('sidebar-trigger__icon--clicked');
    $('.sidebar').toggleClass('sidebar--visible');
});

// Perfect scrollbar
var Ps = require('perfect-scrollbar');
var container = document.getElementById('sidebar');
Ps.initialize(container);
container = document.getElementById('infos');
Ps.initialize(container);
