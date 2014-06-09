var app = angular.module('am');

app.factory('Location', [function() {
  return {
    center: {
      lat: -33.819,
      lng: 150.586 // Sydney
    },

    setCenter: function(newCenter) {
      this.center = newCenter;
    }
  };
}]);
