'use strict';

module.exports = function (places) {
    var self = this;

    self.places = ko.observableArray();
    for (var i = 0, length = places.length ; i < length ; i++) {
        places[i].selected = ko.observable(false);
        self.places.push(places[i]);
    }
    self.search = ko.observable('');

    self.filteredPlaces = ko.computed(function () {
        var search = self.search().toLowerCase();

        if (!search) {
            return self.places();
        } else {
            return ko.utils.arrayFilter(self.places(), function(item) {
                return item.name.toLowerCase().indexOf(search) > -1;
            });
        }
    });
};
