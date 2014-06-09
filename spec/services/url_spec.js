describe('URL', function() {
  var URL, location;

  beforeEach(function() {
    module('am');

    inject(function($injector) {
      location = $injector.get('$location');
      URL = $injector.get('URL');
    });
  });

  describe('.getCenter', function() {
    it('is object with lat and lng', function() {
      location.search({lat: '-30.680', lng: '152.505'});

      expect(URL.getCenter()).toEqual({lat: '-30.680', lng: '152.505'});
    });

    it('is default', function() {
      location.search({});

      expect(URL.getCenter('default')).toBe('default');
    });
  });

  describe('.setCenter', function() {
    it('fixes to 3 decimal places', function() {
      URL.setCenter({lat: -30.680384384, lng: 152.505393583});

      expect(location.search()).toEqual({lat: '-30.680', lng: '152.505'});
    });

    it('persists persists other properties', function() {
      location.search({id: '1'});

      URL.setCenter({lat: -30.680384384, lng: 152.505393583});

      expect(location.search()).toEqual({id: '1', lat: '-30.680', lng: '152.505'});
    });
  });

  describe('.getId', function() {
    it('is integer', function() {
      location.search({id: '42'});

      expect(URL.getId()).toBe(42);
    });

    it('is undefined', function() {
      location.search({});

      expect(URL.getId()).toBeUndefined();
    });
  });

  describe('.unsetId', function() {
    it('persists persists other properties', function() {
      location.search({id: '1', lat: '-30.680', lng: '152.505'});

      URL.unsetId();

      expect(location.search()).toEqual({lat: '-30.680', lng: '152.505'});
    });
  });
});
