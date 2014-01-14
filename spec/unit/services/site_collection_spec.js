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
