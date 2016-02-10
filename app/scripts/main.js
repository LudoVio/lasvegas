/*
 * Main Javascript file.
 */

'use strict';

// Load and create the app
var appFactory = require('./app');
var app = appFactory();

// DEBUG
//window.app = app;
//app.infos.onOpen(app.places.places()[0]);
//$('<button data-toggle="modal" data-target="#modal"></button>').appendTo('body').click();

//var Yelp = require('./app/api/yelp');
//var data = require('./app/datas/apis');
//
//var yelp = new Yelp(data[0]);
//ko.applyBindings(yelp);
//
//window.yelp = yelp;
//window.data = data;
//
//var term = 'Mission Pointe Condo in Silverado Ranch';
//var location = '10245 S Maryland Pkwy, Las Vegas, 89183, United States of America';
//yelp.request(term, location);
