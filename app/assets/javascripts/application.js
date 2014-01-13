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

app.factory('SiteResource', ['$http', function($http) {
  var _radians;

  var SiteResource = function(props) {
    angular.extend(this, props);
    return this;
  };

  SiteResource.nearby = function(position) {
    return this.query().then(function(sites) {
      return _.filter(sites, function(site) {
        return site.isNear(position);
      });
    });
  };

  SiteResource.query = function() {
    return $http({
      url: '/data.json',
      method: 'GET',
      cache: true
    })
    .then(function(response) {
      return _.map(response.data, function(props) {
        return new SiteResource(props);
      });
    });
  };

  SiteResource.prototype.isNear = function(position) {
    return (Math.acos(Math.sin(_radians(this.latitude)) * Math.sin(_radians(position.lat)) + Math.cos(_radians(this.latitude)) * Math.cos(_radians(position.lat)) * Math.cos(_radians(position.lng) - _radians(this.longitude))) * 6378100) <= 150000;
  };

  _radians = function(degrees) {
    return degrees * Math.PI / 180.0;
  };

  return SiteResource;
}]);

app.controller('MapController', ['$scope', 'Location', 'SiteResource', function($scope, Location, SiteResource) {
  $scope.location = Location;
  $scope.markers = [];

  $scope.$watch('location.center', function(center) {
    SiteResource.nearby(center).then(function(sites) {
      $scope.markers = _.map(sites, function(site) {
        return {position: {lat: site.latitude, lng: site.longitude}};
      });
    });
  });
}]);

app.controller('SitesController', ['$scope', 'Location', 'SiteResource', function($scope, Location, SiteResource) {
  $scope.location = Location;
  $scope.sites = [];

  $scope.$watch('location.center', function(center) {
    SiteResource.nearby(center).then(function(sites) {
      $scope.sites = sites;
    });
  });
}]);

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

          google.maps.event.addListener(map, 'dragend', function() {
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
