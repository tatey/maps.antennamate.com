var app = angular.module('am');

app.factory('Location', ['googleLocation',function(googleLocation) {
  var Location = {}
  /**
   * setCenter - Set a new location
   * @param {Object} newCenter Object containing lat and lng floats.
   */
  Location.setCenter = function(newCenter) {
    this.center = newCenter;
  }

  if(googleLocation.center){
    // Attempt to use the googleLocation.
    Location.setCenter(googleLocation.center);
  } else {
    // Set a default if we don't have a location from Google.
    Location.setCenter({
      lat: -33.819,
      lng: 150.586 // Sydney
    });
  }

  return Location;
}]);
