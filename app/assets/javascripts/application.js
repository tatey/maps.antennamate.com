//= require angular

var app = angular.module('am', []);

app.factory('Location', [function() {
  return {
    center: {
      lat: -34.397,
      lng: 150.644
    }
  };
}]);

app.controller('MapController', ['Location', function(Location) {
  this.location = Location;
}]);

app.controller('TransmittersController', ['Location', function(Location) {
  this.location = Location;
}]);

app.directive('googleMap', ['$timeout', function($timeout) {
  return {
    scope: {
      'center': '='
    },

    link: function(scope, el, attrs) {
      var options = {
        zoom: 8,
        center: new google.maps.LatLng(scope.center.lat, scope.center.lng)
      };

      var map = new google.maps.Map(el[0], options);

      google.maps.event.addListener(map, 'center_changed', function() {
        $timeout(function() {
          var center = map.getCenter();
          scope.center = {
            lat: center.lat(),
            lng: center.lng()
          };
        });
      });
    }
  };
}]);
