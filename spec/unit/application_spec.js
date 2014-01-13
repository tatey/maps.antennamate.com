describe('SiteCollection', function() {
  var SiteCollection;

  beforeEach(function() {
    module('am');

    inject(function($injector) {
      SiteCollection = $injector.get('SiteCollection');
    });
  });

  describe('#open', function() {
    var newSite, oldSite;

    beforeEach(function() {
      var collection;

      newSite = {open: false};
      oldSite = {open: true};
      collection = new SiteCollection();
      collection.sites = [oldSite, newSite];

      collection.open(newSite);
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
