/**
 * Model that represente a place.
 */

module.exports = function (data) {
    this.name = data.name;
    this.location = data.location;
    this.coords = data.coords;
    this.selected = ko.observable(false);
};
