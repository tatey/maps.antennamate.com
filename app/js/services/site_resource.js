var app = angular.module('am');

app.factory('SiteResource', ['$http', 'TransmitterResource', function($http, TransmitterResource) {
  var _radians;

  var SiteResource = function(props) {
    angular.extend(this, _.defaults(props, {transmitters: []}));
    return this;
  };

  SiteResource.query = function() {
    return $http({
      url: '/data/sites.json',
      method: 'GET'
    }).then(function(response) {
      return _.map(response.data, function(props) {
        return new SiteResource(props);
      });
    });
  };

  SiteResource.prototype.distanceToPosition = function(position) {
    return Math.acos(Math.sin(_radians(this.latitude)) * Math.sin(_radians(position.lat)) + Math.cos(_radians(this.latitude)) * Math.cos(_radians(position.lat)) * Math.cos(_radians(position.lng) - _radians(this.longitude))) * 6378100;
  };

  SiteResource.prototype.isNearPosition = function(position) {
    return this.distanceToPosition(position) <= 150000.0;
  };

  SiteResource.prototype.getPosition = function() {
    if (!this.position) {
      this.position = {lat: this.latitude, lng: this.longitude};
    }
    return this.position;
  };

  SiteResource.prototype.queryTransmitters = function() {
    var _this = this;
    return TransmitterResource.query({site_id: this.id}).then(function(transmitters) {
      transmitters.resolved = true;
      _this.transmitters = transmitters;
    });
  };

  _radians = function(degrees) {
    return degrees * Math.PI / 180.0;
  };

  return SiteResource;
}]);
