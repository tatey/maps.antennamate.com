//= require angular
//= require underscore

var app = angular.module('am', []);

app.controller('ApplicationController', ['$scope', 'Location', 'SiteCollection', 'URL', function($scope, Location, SiteCollection, URL) {
  var location, sites, url;

  location = new Location();
  sites = new SiteCollection();
  url = new URL();

  location.setCenter(url.getCenter(location.center));
  sites.query();

  $scope.location = location;
  $scope.sites = sites;

  $scope.open = function(site) {
    sites.open(site);
  };

  $scope.$watch('location.center', function(center) {
    url.setCenter(center);
  });
}]);

app.factory('URL', ['$location', function($location) {
  var URL = function() {
    return this;
  };

  URL.prototype.getCenter = function(defaultCenter) {
    var match;

    match = $location.path().match(/^\/([\d\.\-]+),([\d\.\-]+)$/) || [];
    if (match.length === 3) {
      return {lat: match[1], lng: match[2]};
    } else {
      return defaultCenter;
    }
  };

  URL.prototype.setCenter = function(center) {
    var lat, lng;

    lat = parseFloat(center.lat);
    lng = parseFloat(center.lng);

    $location.path('/' + lat.toFixed(3) + ',' + lng.toFixed(3));
  };

  return URL;
}]);

app.factory('Location', [function() {
  var Location = function() {
    this.center = {lat: -34.397, lng: 150.644};
    return this;
  };

  Location.prototype.setCenter = function(center) {
    this.center = center;
  };

  return Location;
}]);

app.factory('SiteCollection', ['SiteResource', function(SiteResource) {
  var SiteCollection = function() {
    this.sites = [];
    return this;
  }

  SiteCollection.prototype.open = function(newSite) {
    var oldSite = _.find(this.sites, function(oldSite) {
      return oldSite.open;
    }) || {};

    oldSite.open = false;
    newSite.open = true;
  };

  SiteCollection.prototype.nearby = function(position) {
    return _.filter(this.sites, function(site) {
      return site.isNear(position);
    });
  };

  SiteCollection.prototype.query = function() {
    var _this = this;
    return SiteResource.query().then(function(sites) {
      _this.sites = sites;
    });
  };

  return SiteCollection;
}]);

app.factory('SiteResource', ['$http', function($http) {
  var _radians;

  var SiteResource = function(props) {
    angular.extend(this, props);
    return this;
  };

  SiteResource.query = function() {
    return $http({
      url: '/data/sites.json',
      method: 'GET'
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

  SiteResource.prototype.getPosition = function() {
    if (!this.position) {
      this.position = {lat: this.latitude, lng: this.longitude};
    }
    return this.position;
  };

  _radians = function(degrees) {
    return degrees * Math.PI / 180.0;
  };

  return SiteResource;
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
        pre: function(scope, el, attrs, ctrl) {
          var div, map, center = scope.center;

          div = angular.element('<div>').css({width: '100%', height: '100%'});
          el.prepend(div);

          map = new google.maps.Map(div[0], {
            zoom: 8,
            center: new google.maps.LatLng(center.lat, center.lng),
            disableDefaultUI: true,
            zoomControl: true
          });

          ctrl.map = map;
        },

        post: function(scope, el, attrs, ctrl) {
          var map = ctrl.map;

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

app.directive('googleInfoWindow', ['$timeout', function($timeout) {
  return {
    scope: {
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
          scope.open = false;
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
        scope.open = false;
        infoWindow.close();
      });
    }
  };
}]);
