describe('URL', function() {
  var URL, location;

  beforeEach(function() {
    module('am');

    inject(function($injector) {
      location = $injector.get('$location');
      URL = $injector.get('URL');
    });
  });

  describe('#getCenter', function() {
    it('is object with lat and lng', function() {
      location.search({lat: '-30.680', lng: '152.505'});

      expect(URL.getCenter()).toEqual({lat: '-30.680', lng: '152.505'});
    });

    it('is default', function() {
      location.search({});

      expect(URL.getCenter('default')).toBe('default');
    });
  });

  describe('#setCenter', function() {
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

  describe('#getId', function() {
    it('is integer', function() {
      location.search({id: '42'});

      expect(URL.getId()).toBe(42);
    });

    it('is undefined', function() {
      location.search({});

      expect(URL.getId()).toBeUndefined();
    });
  });

  describe('#unsetId', function() {
    it('persists persists other properties', function() {
      location.search({id: '1', lat: '-30.680', lng: '152.505'});

      URL.unsetId();

      expect(location.search()).toEqual({lat: '-30.680', lng: '152.505'});
    });
  });
});

describe('SiteCollection', function() {
  var SiteCollection;

  beforeEach(function() {
    module('am');

    inject(function($injector) {
      SiteCollection = $injector.get('SiteCollection');
    });
  });

  describe('#openSite', function() {
    var newSite, oldSite;

    beforeEach(function() {
      newSite = {open: false};
      oldSite = {open: true};

      SiteCollection.sites = [oldSite, newSite];
      SiteCollection.openSite(newSite);
    });

    it('sets new site as open', function() {
      expect(newSite.open).toBeTruthy();
    });

    it('sets old site as closed', function() {
      expect(oldSite.open).toBeFalsy();
    });
  });
});

describe('SiteResource', function() {
  var SiteResource;

  beforeEach(function() {
    module('am');

    inject(function($injector) {
      SiteResource = $injector.get('SiteResource');
    });
  });

  describe('#isNear', function() {
    var position;

    beforeEach(function() {
      position = {lat: -27.574301, lng: 153.065193};
    });

    it('is less than 25,000m', function() {
      var site = new SiteResource({latitude: -27.4661111111111, longitude: 152.946388888889});

      expect(site.isNear(position)).toBeTruthy();
    });

    it('is less than 50,000m', function() {
      var site = new SiteResource({latitude: -27.9711111111111, longitude: 153.212222222222});

      expect(site.isNear(position)).toBeTruthy();
    });

    it('is less than 150,000m', function() {
      var site = new SiteResource({latitude: -26.7913888888889, longitude: 152.917222222222});

      expect(site.isNear(position)).toBeTruthy();
    });
  });
});
