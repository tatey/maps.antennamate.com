describe('Google location', function() {
  var location;

  // Hobart
  var thislat = -42.8790;
  var thislng = 147.3291;

  beforeEach(function() {
    module('am');
    window.google.loader = {
      ClientLocation : {
        latitude: thislat,
        longitude: thislng
      }
    };
    inject(function($injector) {
      location = $injector.get('Location');
    });
  });

  describe('googleLocation', function() {

    it('uses clientLocation', function() {
      expect(location.center).toEqual({lat: thislat, lng: thislng});
    });
  });
});

describe('Default location', function() {
  var location;

  beforeEach(function() {
    module('am');
    window.google.loader = {};
    inject(function($injector) {
      location = $injector.get('Location');
    });
  });

  describe('defaults', function() {
    it('specifies a rational default', function() {
      // This is the default of Sydney, hard-coded into the Location class.
      expect(location.center).toEqual({lat: -33.819, lng: 150.586});
    });
  });
});
