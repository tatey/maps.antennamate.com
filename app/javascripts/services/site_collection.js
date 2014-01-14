var app = angular.module('am');

app.factory('SiteCollection', ['SiteResource', function(SiteResource) {
  return {
    sites: [],

    findById: function(id) {
      return _.find(this.sites, function(site) {
        return site.id === id;
      });
    },

    closeSite: function(oldSite) {
      oldSite.open = false;
    },

    openSite: function(newSite) {
      var oldSite = _.find(this.sites, function(oldSite) {
        return oldSite.open;
      }) || {};

      oldSite.open = false;
      newSite.open = true;
      newSite.queryTransmitters();
    },

    nearby: function(position) {
      return _.filter(this.sites, function(site) {
        return site.isNear(position);
      });
    },

    query: function() {
      var _this = this;
      return SiteResource.query().then(function(sites) {
        _this.sites = sites;
      });
    }
  };
}]);
