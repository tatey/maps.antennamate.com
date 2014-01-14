var app = angular.module('am');

app.directive('googleMarker', ['$timeout', function($timeout) {
  return {
    scope: {
      click: '&',
      position: '='
    },

    require: ['^googleMap', 'googleMarker'],

    controller: function() {
      this.map = undefined;
      this.marker = undefined;
    },

    compile: function(el, attrs) {
      return {
        pre: function(scope, el, attrs, controllers) {
          var googleMapCtrl, googleMarkerCtrl;

          googleMapCtrl = controllers[0];
          googleMarkerCtrl = controllers[1];

          var position, map, marker;

          position = scope.position;
          map = googleMapCtrl.map;
          marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(position.lat, position.lng)
          });

          googleMarkerCtrl.map = map;
          googleMarkerCtrl.marker = marker;
        },

        post: function(scope, el, attrs, controllers) {
          var listener, marker;

          marker = controllers[1].marker;
          listener = google.maps.event.addListener(marker, 'click', function() {
            $timeout(function() {
              scope.click();
            });
          });

          scope.$on('$destroy', function() {
            google.maps.event.removeListener(listener);
            marker.setMap(null);
          });
        }
      };
    }
  };
}]);
