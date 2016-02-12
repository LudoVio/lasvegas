/*
 * Main Javascript file.
 */

'use strict';

// Load and create the app
var appFactory = require('./app');
var app = appFactory();

// Perfect scrollbar
var Ps = require('perfect-scrollbar');
var container = document.getElementById('sidebar');
Ps.initialize(container);
container = document.getElementById('infos');
Ps.initialize(container);
