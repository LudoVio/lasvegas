/**
 * Module for apis ModelView
 */

var yelp = require('./yelp');
var foursquare = require('./foursquare');
var wikipedia = require('./wikipedia');

module.exports = {
    Yelp: yelp,
    Foursquare: foursquare,
    Wikipedia: wikipedia
};
