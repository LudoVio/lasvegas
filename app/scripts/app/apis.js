/**
 * Apis
 * Takes care of the list of apis, the active one
 */

var apiMV = require('./api');

module.exports = function (infos, apis) {
    var self = this;

    self.apis = ko.observableArray(apis.map(function (apiData) {
        return new apiMV[apiData.name](apiData);
    }));

    self.active = ko.observable(null);
    self.setActive = function (api) {
        self.active(api);
        if(api) {
            self.active().request(infos.place().name, infos.place().location);
        }
    };
    self.setActive();

    infos.place.subscribe(function(place) {
        if(self.active()) {
            self.active().clean();
        }
        self.active(null);
    });
};
