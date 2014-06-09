var app = angular.module('am');

app.filter('watts', [function() {
  return function(watts) {
    var value, unit;

    if (watts < 1000.0) {
      value = watts;
      unit  = 'w';
    } else if (watts < 1000000.0) {
      value = watts / 1000.0;
      unit = 'kW';
    } else {
      value = watts / 1000000.0;
      unit = 'MW';
    }

    return value.toFixed(2).replace('.00', '') + ' ' + unit;
  };
}]);
