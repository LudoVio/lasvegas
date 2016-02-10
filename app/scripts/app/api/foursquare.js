/**
 * ModelView for the Foursquare api
 */

module.exports = function (api) {
    var self = this;

    // State of the object: empty | loading | loaded | error
    self.state = ko.observable('empty');

    // Api data
    self.name = api.name;
    self.url = api.url;
    self.auth = api.auth;

    // Properties for view
    self.recommandedPlaces = ko.observableArray([]);

    // Empty the object
    self.clean = function () {
        self.recommandedPlaces([]);
        self.state('empty');
    };

    // Call when request succeed
    self.onSucces = function (results) {
        self.recommandedPlaces(results.response.groups[0].items);

        self.state('loaded');
    };

    // Call when request fail
    // TODO: save the error information for view
    self.onError = function (jqXHR, textStatus, errorThrown) {
        self.state('error');
    };

    // Make a request to Foursquare
    self.request = function (name, location, coords) {
        self.state('loading');

        // Create a global for the jsonp callback
        window.foursquareOnSucces = self.onSucces;

        var parameters = {
            client_id: self.auth.id,
            client_secret: self.auth.secret,
            ll: coords.split(',').reverse().join(','),
            v: '20160109',
            m: 'foursquare'
        };

        var settings = {
            url: self.url,
            data: parameters,
            cache: true,
            dataType: 'jsonp',
            jsonpCallback: 'foursquareOnSucces',
            error: self.onError
        };

        $.ajax(settings);
    }
};
