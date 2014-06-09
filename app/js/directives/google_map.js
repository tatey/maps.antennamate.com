var app = angular.module('am');

app.directive('googleMap', ['$timeout', function($timeout) {
  return {
    scope: {
      'center': '='
    },

    controller: function() {
      this.map = undefined;
    },

    compile: function(el, attrs) {
      return {
        pre: function(scope, el, attrs, ctrl) {
          var div, map, center = scope.center;

          div = angular.element('<div>').css({width: '100%', height: '100%'});
          el.prepend(div);

          map = new google.maps.Map(div[0], {
            zoom: 9,
            center: new google.maps.LatLng(center.lat, center.lng),
            disableDefaultUI: true,
            zoomControl: true
          });

          ctrl.map = map;
        },

        post: function(scope, el, attrs, ctrl) {
          var map, handler;

          map = ctrl.map;
          handler = function() {
            var center = map.getCenter();

            $timeout(function() {
              scope.center = {
                lat: center.lat(),
                lng: center.lng()
              };
            });
          };

          google.maps.event.addListener(map, 'dragend', handler);
          google.maps.event.addListener(map, 'zoom_changed', handler);
        }
      };
    }
  };
}]);
