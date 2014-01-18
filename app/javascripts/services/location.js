var app = angular.module('am');

app.factory('Location', [function() {
  var center;

  // Where possible, use Google's IP-based geolocation
  if(window.google && google.loader && google.loader.ClientLocation && google.loader.ClientLocation.latitude){
    center = {
      lat: google.loader.ClientLocation.latitude,
      lng: google.loader.ClientLocation.longitude
    };
  } else {
    center = {
      lat: -33.819,
      lng: 150.586 // Sydney
    };
  }

  return {
    center: center,

    setCenter: function(newCenter) {
      this.center = newCenter;
    }
  };
}]);
