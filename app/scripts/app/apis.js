/**
 * Apis
 * Takes care of the list of apis, the active one
 */

var apiMV = require('./api');

module.exports = function (infos, apis) {
    var self = this;

    // For each api, create the corresponding apiMV and send it the right data
    self.apis = ko.observableArray(apis.map(function (apiData) {
        return new apiMV[apiData.name](apiData);
    }));

    self.active = ko.observable(null);
    self.setActive = function (api) {
        self.active(api);

        // If the active api is not null, call Api.request(name, location, coords)
        if(api) {
            self.active().request(infos.place().name, infos.place().location, infos.place().coords);
        }
    };

    // Watch for change in the selected Place
    // Clean the old api and set self.active to null
    infos.place.subscribe(function(place) {
        if(self.active()) {
            self.active().clean();
        }
        self.active(null);
    });
};
