var app = angular.module('am');

app.controller('ApplicationController', ['$scope', 'Location', 'SiteCollection', 'URL', function($scope, Location, SiteCollection, URL) {
  Location.setCenter(URL.getCenter(Location.center));

  SiteCollection.query().then(function() {
    var site;

    site = SiteCollection.findById(URL.getId());
    if (site) {
      SiteCollection.openSite(site);
    }
  });

  $scope.location = Location;
  $scope.sites = SiteCollection;

  $scope.close = function(site) {
    SiteCollection.closeSite(site);
    URL.unsetId();
  };

  $scope.open = function(site) {
    SiteCollection.openSite(site);
    URL.setId(site.id);
  };

  $scope.$watch('location.center', function(center) {
    URL.setCenter(center);
  });
}]);
