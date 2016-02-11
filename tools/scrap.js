#!/usr/bin/env node

/*
 * Script used to grab data from booking.com.
 */

'use strict';

var path = require('path');
var fs = require('fs');
var async = require('async');
var Xray = require('x-ray');
var xray = Xray();

var places_path = path.join(__dirname, '../app/scripts/places.json');
var booking_vegas_url = 'http://www.booking.com/searchresults.html?&city=20079110&offset=';
var offset = 0;

// Grab the urls of all listing pages for places in Las Vegas.
var get_urls = function (url, cb) {
    xray(booking_vegas_url + offset, {
        count: '.sorth1'
    })(function (err, obj) {
        var count = parseInt(obj.count.trim());
        var urls = [];
        for (offset = 0 ; offset < count ; offset += 15) {
            urls.push(booking_vegas_url + offset);
        }
        cb(err, urls);
    })
};

// Grab the infos on one page (name, coords, link to the single page of a place).
var get_page_infos = function (url, cb) {
    xray(url, '.sr_item', [{
        name: '.hotel_name_link',
        coords: '.district_link@data-coords',
        url: '.hotel_name_link@href'
    }])(function(err, obj) {
        var infos = obj.map(function (el) {
            return {
                name: el.name.trim().split(',')[0],
                coords: el.coords.trim(),
                url: el.url.trim()
            };
        });

        cb(err, infos);
    })
};

// Visite the link to the single page of a place and grab the address
var get_location = function (info, cb) {
    xray(info.url, '.hp_address_subtitle')(function(err, location) {
        delete info.url;
        info.location = location.trim();

        cb(err, info);
    });
};

// Visite all pages and grab the complet infos
var get_infos = function (urls, cb) {
    async.concat(urls, get_page_infos, function(err, infos){
        async.map(infos, get_location, function(err, results){
            cb(err, results);
        });
    });
};

// Finaly let's get the job done and write it to a file
get_urls(booking_vegas_url + offset, function (err, urls) {
    get_infos(urls, function (err, infos) {
        fs.writeFileSync(places_path, JSON.stringify(infos));
    })
});
