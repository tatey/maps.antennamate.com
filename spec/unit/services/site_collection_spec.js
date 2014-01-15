describe('SiteCollection', function() {
  var SiteCollection;

  beforeEach(function() {
    module('am');

    inject(function($injector) {
      SiteCollection = $injector.get('SiteCollection');
    });
  });

  describe('.findById', function() {
    it('it returns the site with the id matching the given argument', function() {
      var site1, site2, site3;

      site1 = {id: 1};
      site2 = {id: 2};
      site3 = {id: 3};

      SiteCollection.sites = [site1, site2, site3];

      expect(SiteCollection.findById(3)).toEqual(site3);
    });
  });

  describe('.closeSite', function() {
    it('sets open to false', function() {
      var oldSite = {open: true};

      SiteCollection.closeSite(oldSite);

      expect(oldSite.open).toBeFalsy();
    });
  });

  describe('.openSite', function() {
    var newSite, oldSite, deferred, rootScope;

    beforeEach(function() {
      inject(function($injector) {
        deferred = $injector.get('$q').defer();
        rootScope = $injector.get('$rootScope');
      });

      newSite = {open: false, queryTransmitters: function() { return deferred.promise }};
      oldSite = {open: true};

      SiteCollection.sites = [oldSite, newSite];
      SiteCollection.openSite(newSite);

      deferred.resolve();
      rootScope.$digest();
    });

    it('sets old site as closed', function() {
      expect(oldSite.open).toBeFalsy();
    });

    it('sets new site as open', function() {
      expect(newSite.open).toBeTruthy();
    });
  });
});
