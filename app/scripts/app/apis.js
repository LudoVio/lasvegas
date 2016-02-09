/**
 * Apis
 * Takes care of the list of apis, the active one
 */

var Api = require('./api');

module.exports = function (apis) {
    var self = this;

    self.apis = ko.observableArray(apis.map(function (apiData) {
        return new Api(apiData);
    }));
    self.active = ko.observable({});
};
