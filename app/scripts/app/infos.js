/**
 * Model that represente the modal infos window.
 * It contains the selected Place and apis
 */

var Apis = require('./apis');

module.exports = function (apis) {
    var self = this;

    self.place = ko.observable({});
    self.apis = new Apis(self, apis);

    // Called when the Bootstrap modal is opened
    self.onOpen = function (place) {
        self.place(place);
    };
};
