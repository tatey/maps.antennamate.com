//= require angular
//= require underscore

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
  this.markers  = [{position: {lat: -34.397, lng: 150.644}}];
}]);

app.controller('TransmittersController', ['Location', function(Location) {
  this.location = Location;
}]);

app.directive('googleMap', ['$document', '$timeout', function($document, $timeout) {
  return {
    scope: {
      'center': '='
    },

    controller: function() {
      this.map = undefined;
    },

    compile: function(el, attrs) {
      return {
        pre: function(scope, el, attrs, controller) {
          var div, map, center = scope.center;

          div = angular.element('<div>').css({width: '100%', height: '100%'});
          el.prepend(div);

          map = new google.maps.Map(div[0], {
            zoom: 8,
            center: new google.maps.LatLng(center.lat, center.lng)
          });

          controller.map = map;
        },

        post: function(scope, el, attrs, controller) {
          var map = controller.map;

          google.maps.event.addListener(map, 'center_changed', function() {
            var center = map.getCenter();

            $timeout(function() {
              scope.center = {
                lat: center.lat(),
                lng: center.lng()
              };
            });
          });
        }
      };
    }
  };
}]);

app.directive('googleMarker', [function() {
  return {
    scope: {
      position: '='
    },

    require: '^googleMap',

    link: function(scope, el, attrs, googleMap) {
      var position, latlng, marker;

      position = scope.position;
      latlng   = new google.maps.LatLng(position.lat, position.lng);
      marker   = new google.maps.Marker({map: googleMap.map, position: latlng});

      scope.$on('$destroy', function() {
        marker.setMap(null);
      });
    }
  }
}]);
