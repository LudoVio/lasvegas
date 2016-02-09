'use strict';

var Place = require('./place');
var Infos = require('./infos');

module.exports = function (datas) {
    var self = this;

    self.places = ko.observableArray(datas.places.map(function (placeData) {
        return new Place(placeData);
    }));

    self._search = '';
    self.search = ko.pureComputed({
        read: function () {
            return this._search;
        },
        write: function (search) {
            this._search = search;
            for (var i = 0, length = this.places().length ; i < length ; i++) {
                var name = this.places()[i].name.toLowerCase();
                this.places()[i].visible(name.indexOf(search) > -1);
            }
        },
        owner: self
    });

    self.infos = new Infos(datas.apis);

    self.setInfosPlace = function (place_id) {
        var place = self.places()[place_id];
        self.infos._place(place);
    };
};
