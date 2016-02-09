/**
 * Model that represente a the modal infos window.
 */

var Apis = require('./apis');

module.exports = function (apis) {
    var self = this;

    self.place = ko.observable({});
    self.apis = new Apis(apis);

    self.onOpen = function (place) {
        self.place(place);
        self.apis.active({});
    };
};
