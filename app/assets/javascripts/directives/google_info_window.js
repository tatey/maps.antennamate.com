var app = angular.module('am');

app.directive('googleInfoWindow', ['$timeout', function($timeout) {
  return {
    scope: {
      click: '&',
      open: '='
    },

    require: '^googleMarker',

    link: function(scope, el, attrs, googleMarkerCtrl) {
      var map, marker, infoWindow, listener;

      map = googleMarkerCtrl.map;
      marker = googleMarkerCtrl.marker;
      infoWindow = new google.maps.InfoWindow();

      listener = google.maps.event.addListener(infoWindow, 'closeclick', function() {
        $timeout(function() {
          scope.click();
        });
      });

      scope.$watch('open', function(value) {
        if (typeof value === 'undefined') return;

        if (value) {
          infoWindow.setContent(el.html());
          infoWindow.open(map, marker);
        } else {
          infoWindow.close();
        }
      });

      scope.$on('$destroy', function() {
        google.maps.event.removeListener(listener);
        infoWindow.close();
      });
    }
  };
}]);
