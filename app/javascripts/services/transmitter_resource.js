var app = angular.module('am');

app.factory('TransmitterResource', ['$http', function($http) {
  var TransmitterResource = function(props) {
    angular.extend(this, props);
    return this;
  };

  TransmitterResource.query = function(options) {
    return $http({
      url: '/data/sites/' + options.site_id + '/transmitters.json',
      method: 'GET',
      cache: true
    }).then(function(response) {
      return _.map(response.data, function(props) {
        return new TransmitterResource(props);
      });
    });
  };

  return TransmitterResource;
}]);
