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
      newSite = {open: false, queryTransmitters: angular.noop};
      oldSite = {open: true};

      spyOn(newSite, 'queryTransmitters');

      SiteCollection.sites = [oldSite, newSite];
      SiteCollection.openSite(newSite);
    });

    it('sets old site as closed', function() {
      expect(oldSite.open).toBeFalsy();
    });

    it('sets new site as open', function() {
      expect(newSite.open).toBeTruthy();
    });

    it ('queries transmitters', function() {
      expect(newSite.queryTransmitters).toHaveBeenCalled();
    });
  });
});
