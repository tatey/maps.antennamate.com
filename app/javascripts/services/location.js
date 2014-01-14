var app = angular.module('am');

app.factory('Location', [function() {
  return {
    center: {
      lat: -34.397,
      lng: 150.655
    },

    setCenter: function(newCenter) {
      this.center = newCenter;
    }
  };
}]);
