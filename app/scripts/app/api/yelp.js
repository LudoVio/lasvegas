/**
 * ModelView for the Yelp api
 */

module.exports = function (api) {
    var self = this;

    // State of the object: empty | loading | loaded | error
    self.state = ko.observable('empty');

    // Api data
    self.name = api.name;
    self.url = api.url;
    self.oauth = api.oauth;

    // Properties for view
    self.link = ko.observable('');
    self.rating = ko.observable('');
    self.rating_image_link = ko.observable('');
    self.review_count = ko.observable('');

    // Empty the object
    self.clean = function () {
        self.link('');
        self.rating('');
        self.rating_image_link('');
        self.review_count('');
        self.state('empty');
    };

    // Call when request succeed
    self.onSucces = function (results) {
        var infos = results.businesses[0];

        self.link(infos.url);
        self.rating(infos.rating);
        self.rating_image_link(infos.rating_img_url_large);
        self.review_count(infos.review_count);

        self.state('loaded');
    };

    // Call when request fail
    // TODO: save the error information for view
    self.onError = function (jqXHR, textStatus, errorThrown) {
        self.state('error');
    };

    // Make a request to the search endpoint of yelp
    self.request = function (name, location) {
        self.state('loading');

        // Create a global for the jsonp callback
        window.yelpOnSucces = self.onSucces;

        var parameters = {
            oauth_consumer_key: self.oauth.oauth_consumer_key,
            oauth_token: self.oauth.oauth_token,
            oauth_nonce: rdmString(),
            oauth_timestamp: Math.floor(Date.now()/1000),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version : '1.0',
            callback: 'yelpOnSucces',
            term: name,
            location: location
        };

        var encodedSignature = oauthSignature.generate(
            'GET',
            self.url,
            parameters,
            self.oauth.oauth_consumer_secret,
            self.oauth.oauth_token_secret);
        parameters.oauth_signature = encodedSignature;

        var settings = {
            url: self.url,
            data: parameters,
            cache: true,
            dataType: 'jsonp',
            jsonpCallback: 'yelpOnSucces',
            error: self.onError
        };

        $.ajax(settings);
    }
};


// Generate a random string(10)
// It s needed by Yelp for oauth
function rdmString()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

