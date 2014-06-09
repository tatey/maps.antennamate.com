/* Define custom server-side HTTP routes for lineman's development server
 *   These might be as simple as stubbing a little JSON to
 *   facilitate development of code that interacts with an HTTP service
 *   (presumably, mirroring one that will be reachable in a live environment).
 *
 * It's important to remember that any custom endpoints defined here
 *   will only be available in development, as lineman only builds
 *   static assets, it can't run server-side code.
 *
 * This file can be very useful for rapid prototyping or even organically
 *   defining a spec based on the needs of the client code that emerge.
 *
 */

module.exports = {
  drawRoutes: function(app) {
    app.get('/data/sites.json', function(req, res) {
      res.json([
          {"id":2307,"name":"Artarmon","latitude":-33.80694444444444,"longitude":151.17944444444444,"area_served":"Sydney","callsign":"SBS34","frequency":571.5,"polarisation":"horizontal","antenna_height":210,"channel":"34","maximum_erp":200000.0,"signal_type":"digital","country_code":"au"}
      ]);
    });

    app.get('/data/sites/2307/transmitters.json', function(req, res) {
      res.json([
        {"id":2298,"name":"Artarmon","latitude":-33.80694444444444,"longitude":151.17944444444444,"area_served":"Sydney","callsign":"ATN6","frequency":177.5,"polarisation":"horizontal","antenna_height":194,"channel":"6","maximum_erp":50000.0,"signal_type":"digital","country_code":"au"},
        {"id":2300,"name":"Artarmon","latitude":-33.80694444444444,"longitude":151.17944444444444,"area_served":"Sydney","callsign":"TCN8","frequency":191.625,"polarisation":"horizontal","antenna_height":194,"channel":"8","maximum_erp":50000.0,"signal_type":"digital","country_code":"au"},
        {"id":2301,"name":"Artarmon","latitude":-33.80694444444444,"longitude":151.17944444444444,"area_served":"Sydney","callsign":"TEN11","frequency":219.5,"polarisation":"horizontal","antenna_height":194,"channel":"11","maximum_erp":50000.0,"signal_type":"digital","country_code":"au"},
        {"id":2304,"name":"Artarmon","latitude":-33.80694444444444,"longitude":151.17944444444444,"area_served":"Sydney","callsign":"ABC12","frequency":226.5,"polarisation":"horizontal","antenna_height":192,"channel":"12","maximum_erp":50000.0,"signal_type":"digital","country_code":"au"},
        {"id":2307,"name":"Artarmon","latitude":-33.80694444444444,"longitude":151.17944444444444,"area_served":"Sydney","callsign":"SBS34","frequency":571.5,"polarisation":"horizontal","antenna_height":210,"channel":"34","maximum_erp":200000.0,"signal_type":"digital","country_code":"au"}
      ]);
    });
  }
};
