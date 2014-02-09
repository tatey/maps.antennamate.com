var app = angular.module('am');

app.factory('googleLocation', ['$window', function($window) {
  var center = false;
  // Check to see if we've got a clientLocation.
  if(window.google && google.loader && google.loader.ClientLocation && google.loader.ClientLocation.latitude){
    center = {
      lat: google.loader.ClientLocation.latitude,
      lng: google.loader.ClientLocation.longitude
    };
  }
  return {
    center: center
  }
}]);