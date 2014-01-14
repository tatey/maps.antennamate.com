var app = angular.module('am');

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
