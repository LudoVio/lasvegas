/**
 * ModelView for the Wikipedia api
 */

module.exports = function (api) {
    var self = this;

    self.name = api.name;
    self.response = ko.observable('');
};
