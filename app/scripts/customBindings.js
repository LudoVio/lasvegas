/*
 * Custom Bindings for Knockout.js.
 */

module.exports = function (ko) {
    ko.bindingHandlers.selected = {
        update: function(element, valueAccessor) {
            // On update, fade in/out
            var shouldDisplay = valueAccessor();
            shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
        }
    };
};
