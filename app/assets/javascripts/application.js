//= require angular

var app = angular.module('app', []);

app.directive('amGoogleMap', [function() {
  return {
    link: function(scope, el, attrs) {
      var options = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644)
      };

      var map = new google.maps.Map(el[0], options);
    }
  };
}]);
