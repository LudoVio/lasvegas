/**
 * ModelView for the Yelp api
 */

module.exports = function (api) {
    var self = this;

    self.name = api.name;
    self.response = ko.observable({});
    self.url = api.url;
    self.oauth = api.oauth;

    // Properties for view
    self.link = ko.observable('');
    self.rating = ko.observable('');
    self.rating_image_link = ko.observable('');
    self.review_count = ko.observable('');
    self.error = ko.observable(false);

    self.clean = function () {
        self.link('');
        self.rating('');
        self.rating_image_link('');
        self.review_count('');
        self.error(false);
    };

    // Call when request succeed
    self.onSucces = function (results) {
        console.log('Success request yelp');
        console.log('results', results);
        console.log('error', self.error());

        var infos = results.businesses[0];

        self.link(infos.url);
        self.rating(infos.rating);
        self.rating_image_link(infos.rating_img_url_large);
        self.review_count(infos.review_count);
    };

    // Call when request fail
    self.onError = function (jqXHR, textStatus, errorThrown) {
        self.error(true);
    };

    // Make a request the the search endpoint of yelp
    self.request = function (term, location) {
        self.error(false);
        window.yelpOnSucces = self.onSucces;

        var parameters = {
            oauth_consumer_key: self.oauth.oauth_consumer_key,
            oauth_token: self.oauth.oauth_token,
            oauth_nonce: rdmString(),
            oauth_timestamp: Math.floor(Date.now()/1000),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version : '1.0',
            callback: 'yelpOnSucces',
            term: term,
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
            error: function(jqXHR, textStatus, errorThrown) {
                self.onError(jqXHR, textStatus, errorThrown);
            }
        };

        var jqxhr = $.ajax(settings);
    }
};

function rdmString()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

