/**
 * Model that represente a the modal infos window.
 */

module.exports = function () {
    var self = this;

    self._place = ko.observable(null);
    self.name = ko.computed(function () {
        if(! self._place()) {
            return '';
        }
        return self._place().name;
    });
    self.location = ko.computed(function () {
        if(! self._place()) {
            return '';
        }
        return self._place().location;
    });

    self.active = ko.observable(null);
    self.apis = [
        'Yelp',
        'Foursquare',
        'Wikipedia'
    ];
    self.setActive = function (api) {
        self.active(api);
    };
};
