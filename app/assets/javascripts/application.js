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

app.factory('Transmitter', ['$http', function($http) {
  var _radians;

  var Transmitter = function(props) {
    angular.extend(this, props);
    return this;
  };

  Transmitter.nearby = function(position) {
    return this.query().then(function(transmitters) {
      return _.filter(transmitters, function(transmitter) {
        return transmitter.isNear(position);
      });
    });
  };

  Transmitter.query = function() {
    return $http({
      url: '/data.json',
      method: 'GET'
    })
    .then(function(response) {
      return _.map(response.data, function(props) {
        return new Transmitter(props);
      });
    });
  };

  Transmitter.prototype.isNear = function(position) {
    return (Math.acos(Math.sin(_radians(this.latitude)) * Math.sin(_radians(position.lat)) + Math.cos(_radians(this.latitude)) * Math.cos(_radians(position.lat)) * Math.cos(_radians(position.lng) - _radians(this.longitude))) * 6378100) <= 150000;
  };

  _radians = function(degrees) {
    return degrees * Math.PI / 180.0;
  };

  return Transmitter;
}]);

app.controller('MapController', ['Location', function(Location) {
  this.location = Location;
  this.markers = [{position: {lat: -34.397, lng: 150.644}}];
}]);

app.controller('TransmittersController', ['Location', 'Transmitter', function(Location, Transmitter) {
  this.location = Location;
  this.transmitters = Transmitter.nearby(this.location.center);
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
