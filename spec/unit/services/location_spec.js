describe('Google location', function() {
  var location;

  var hobart = {
    lat: -42.8790,
    lng: 147.3291
  }

  beforeEach(function() {
    module('am');
    window.google.loader = {
      ClientLocation : {
        latitude: hobart.lat,
        longitude: hobart.lng
      }
    };
    inject(function($injector) {
      location = $injector.get('Location');
    });
  });

  describe('googleLocation', function() {

    it('uses clientLocation', function() {
      expect(location.center).toEqual({lat: hobart.lat, lng: hobart.lng});
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

  describe('.setCenter', function() {
    it('sets correctly', function() {
      var london = {
        lat: 51.4983,
        lng: -0.1188
      }

      location.setCenter(london);
      // This is the default of Sydney, hard-coded into the Location class.
      expect(location.center).toEqual({lat: london.lat, lng: london.lng});
    });
  });
});
