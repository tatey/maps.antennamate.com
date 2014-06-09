var app = angular.module('am');

app.factory('URL', ['$location', function($location) {
  return {
    getCenter: function(defaultCenter) {
      var center;

      center = _.pick($location.search(), 'lat', 'lng');
      if (!_.isEmpty(center)) {
        return center;
      } else {
        return defaultCenter;
      }
    },

    setCenter: function(center) {
      var lat, lng;

      lat = parseFloat(center.lat).toFixed(3);
      lng = parseFloat(center.lng).toFixed(3);

      $location
        .search(_.extend($location.search(), {lat: lat, lng: lng}))
        .replace();
    },

    getId: function() {
      var id = $location.search().id;

      if (id) {
        return parseInt(id, 10);
      }
    },

    setId: function(id) {
      $location
        .search(_.extend($location.search(), {id: id}))
        .replace();
    },

    unsetId: function() {
      $location
        .search(_.omit($location.search(), 'id'))
        .replace();
    }
  };
}]);
